import React, {useEffect, useMemo, useState} from 'react';
import {Flex, Form, Input, message, Popconfirm, Table, TableProps, Typography} from 'antd';
import {CommunityService} from "/imports/ui/Services/CommunityService";
import Search from "antd/es/input/Search";
import {formatDate} from "/imports/utils/formatDate";
import {useDebugMount} from "/imports/ui/hooks/useDebugMount";
import {MethodGetPhotoAlbumListResponseModel} from "/imports/api/PhotoAlbum/models";
import {
    MethodGetCommunityListResponseModel
} from "/imports/api/community/models";

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

export const CommunityList: React.FC = () => {
    const {communitiesList, communitiesListFetch, updateCommunityById, deleteCommunityById} = CommunityService()

    useDebugMount("CommunityList");

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState<string>('');

    useEffect(() => {
        communitiesListFetch().catch(console.error);
    }, []);

    const isEditing = (record: MethodGetCommunityListResponseModel) => record.communityId === editingKey;

    const edit = (record: MethodGetCommunityListResponseModel) => {
        form.setFieldsValue({title: record.title});
        setEditingKey(record.communityId);
    };

    const cancel = () => setEditingKey('');

    const save = (communityId: string) => {
        form.validateFields()
            .then(async ({title}) => {
                await updateCommunityById({communityId, title})
                setEditingKey('');
                message.success('Title updated');
                return communitiesListFetch()
            })
            .catch(console.error)
    };

    const handleDelete = (communityId: string) => {
        deleteCommunityById({communityId})
            .then(async () => {
                const photoAlbum = communitiesList.find(community => community.communityId === communityId);
                if (photoAlbum) message.success(`Community ${photoAlbum?.title} deleted`);
                return communitiesListFetch();
            })
            .catch(console.error);
    };

    const columns = useMemo<TableProps<MethodGetCommunityListResponseModel>['columns']>(() => ([
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            editable: true as const
        },
        {
            title: 'Datum',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (_: any, {createdAt}) => formatDate(createdAt),
        },
        {
            title: 'Clubs',
            dataIndex: 'clubs',
            key: 'clubs',
            align: 'center',
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
                                <Popconfirm title="Sure to Save?" onConfirm={() => save(record.communityId)}
                                            style={{marginRight: 8}}>
                                    <a>Save</a>
                                </Popconfirm>
                            </>
                        ) : (
                            <>
                                <Typography.Link onClick={() => edit(record)}>
                                    Bearbeiten
                                </Typography.Link>
                                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.communityId)}>
                                    <a>Delete</a>
                                </Popconfirm>
                            </>
                        )}
                    </Flex>
                );
            },
        },
    ]), [communitiesList, editingKey]);

    const mergedColumns: TableProps<MethodGetCommunityListResponseModel>['columns'] =
        (columns as any).map((col: any) => {
            if (!col.editable) return col;
            return {
                ...col,
                onCell: (record: MethodGetCommunityListResponseModel) => ({
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
                <Table<MethodGetCommunityListResponseModel>
                    components={{body: {cell: EditableCell}}}
                    rowKey="communityId"
                    pagination={{position: ["bottomCenter"], onChange: cancel}}
                    columns={mergedColumns}
                    dataSource={communitiesList}
                    style={{minWidth: "375px"}}
                />
            </Form>
        </Flex>
    );
};