import React, {CSSProperties, useEffect, useMemo, useState} from 'react';
import {Flex, Form, Input, message, Popconfirm, Table, TableProps, Tag, Typography} from 'antd';
import {CheckCircleOutlined, ClockCircleOutlined, SyncOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import {formatDate} from "/imports/utils/formatDate";
import {
    MethodGetPhotoAlbumListResponseModel,
    MethodUpdatePhotoAlbumRequestModel
} from "/imports/api/PhotoAlbum/models";
import {generatePath, Link} from "react-router-dom";
import {protectedRoutes} from "/imports/ui/Router/routes";
import {useDebugMount} from "/imports/ui/hooks/useDebugMount";
import {PhotoAlbumService} from "/imports/ui/Services/PhotoAlbumService";

const EditableCell: React.FC<React.PropsWithChildren<{
    editing: boolean;
    dataIndex: 'title';
    title: React.ReactNode;
    record: MethodGetPhotoAlbumListResponseModel;
    index: number;
}>> = ({editing, dataIndex, title, record, index, children, ...restProps}) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{margin: 0}}

                    rules={[{required: true, message: `Please input ${title}!`}]}
                >
                    <Input autoFocus size="small"/>
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export const PhotoAlbumsList: React.FC = () => {
    const {
        photoAlbumsList,
        loading,
        photoAlbumsListFetch,
        deletePhotoAlbumById,
        updatePhotoAlbum
    } = PhotoAlbumService();

    useDebugMount("PhotoAlbumsList");

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState<string>('');

    useEffect(() => {
        photoAlbumsListFetch().catch(message.error);
    }, []);

    const isEditing = (record: MethodGetPhotoAlbumListResponseModel) => record.albumId === editingKey;

    const edit = (record: MethodGetPhotoAlbumListResponseModel) => {
        form.setFieldsValue({title: record.title});
        setEditingKey(record.albumId);
    };

    const cancel = () => setEditingKey('');

    const save = (albumId: string) => {
        form.validateFields()
            .then(async ({title}) => {
                const data: MethodUpdatePhotoAlbumRequestModel = {albumId, title}
                await updatePhotoAlbum(data)
                setEditingKey('');
                message.success('Title updated');
                return photoAlbumsListFetch()
            })
            .catch(console.error)
    };

    const handleDelete = (albumId: string) => {
        deletePhotoAlbumById(albumId)
            .then(async () => {
                const photoAlbum = photoAlbumsList.find(photoAlbum => photoAlbum.albumId === albumId);
                if (photoAlbum) message.success(`Fotomappe ${photoAlbum?.title} deleted`);
                return photoAlbumsListFetch();
            })
            .catch(console.error);
    };

    const columns = useMemo<TableProps<MethodGetPhotoAlbumListResponseModel>['columns']>(() => ([
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            editable: true as const, // 👈 флажок для merge
            render: (_: any, {title, albumId}) => (
                <Link to={generatePath(protectedRoutes.club_admin.dashboardPhotoAlbum.path, {albumId})}>
                    {title}
                </Link>
            ),
        },
        {
            title: 'Datum',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (_: any, {createdAt}) => formatDate(createdAt),
        },
        {
            title: 'Foto anzahl',
            dataIndex: 'numberOfPhotos',
            key: 'numberOfPhotos',
            align: 'center',
        },
        {
            title: 'Bewertung',
            dataIndex: 'rating',
            key: 'rating',
            align: 'center',
            render: (_: any, {contest, rating}) => {
                if (contest.status === "Active" && rating !== null) {
                    return rating ? `${rating} / 10` : '-';
                }
                return 'Nicht bewertet';
            }
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            render: (_: any, {contest}) => {
                const style: CSSProperties = {width: "115px"};
                switch (contest.status) {
                    case "Active":
                        return <Tag style={style} icon={<CheckCircleOutlined/>} color="success">Bewertet</Tag>;
                    case "Inactive":
                        return <Tag style={style} icon={<SyncOutlined spin/>} color="processing">Pending</Tag>;
                    case "Pending":
                        return <Tag style={style} icon={<ClockCircleOutlined/>} color="default">Nicht bewertet</Tag>;
                }
            }
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_: any, record) => {
                const editable = isEditing(record);
                return (
                    <Flex justify={"center"} wrap gap={"small"}>
                        {editable ? (
                            <>
                                <Typography.Link onClick={cancel}>
                                    Cancel
                                </Typography.Link>
                                <Popconfirm title="Sure to Save?" onConfirm={() => save(record.albumId)}
                                            style={{marginRight: 8}}>
                                    <a>Save</a>
                                </Popconfirm>
                            </>
                        ) : (
                            <>
                                <Typography.Link onClick={() => edit(record)}>
                                    Bearbeiten
                                </Typography.Link>
                                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.albumId)}>
                                    <a>Delete</a>
                                </Popconfirm>
                            </>
                        )}
                    </Flex>
                );
            },
        },
    ]), [photoAlbumsList, editingKey]);

    const mergedColumns: TableProps<MethodGetPhotoAlbumListResponseModel>['columns'] =
        (columns as any).map((col: any) => {
            if (!col.editable) return col;
            return {
                ...col,
                onCell: (record: MethodGetPhotoAlbumListResponseModel) => ({
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                }),
            };
        });

    return (
        <Flex vertical gap={"small"}>
            <Flex justify={"flex-end"}>
                <Search
                    placeholder="search"
                    loading={false}
                    allowClear
                    style={{width: 'calc(100vw - 75%)', maxWidth: '300', margin: '0 20px 0 0'}}
                />
            </Flex>

            <Form form={form} component={false}>
                <Table<MethodGetPhotoAlbumListResponseModel>
                    components={{body: {cell: EditableCell}}}
                    loading={loading}
                    rowKey="albumId"
                    pagination={{position: ["bottomCenter"], onChange: cancel}}
                    columns={mergedColumns}
                    dataSource={photoAlbumsList}
                    style={{minWidth: "375px"}}
                />
            </Form>
        </Flex>
    );
};
