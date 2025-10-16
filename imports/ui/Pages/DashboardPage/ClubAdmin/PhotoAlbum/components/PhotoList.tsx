import React, { useEffect, useMemo, useState } from 'react';
import { Table, Image, Flex, Popconfirm, message, TableProps, Form, Input, Typography } from 'antd';
import { MethodGetPhotosListByAlbumIdResponseModel } from "/imports/api/Photo/models";
import { formatDate } from "/imports/utils/formatDate";
import { useParams } from "react-router-dom";
import { useDebugMount } from "/imports/ui/hooks/useDebugMount";
import { PhotoService } from "/imports/ui/Services/PhotoService";

type EditingKind = 'title' | 'photographer';

const EditableCell: React.FC<React.PropsWithChildren<{
    editing: boolean;
    dataIndex: 'title' | 'photographer';
    title: React.ReactNode;
    record: MethodGetPhotosListByAlbumIdResponseModel;
    index: number;
    kind: EditingKind;
}>> = ({ editing, dataIndex, title, record, index, kind, children, ...restProps }) => {
    return (
        <td {...restProps}>
            {editing ? (
                kind === 'title' ? (
                    <Form.Item
                        name="title"
                        style={{ margin: 0 }}
                        rules={[{ required: true, message: `Please input ${title}!` }]}
                    >
                        <Input autoFocus size="small" />
                    </Form.Item>
                ) : (
                    <Input.Group compact>
                        <Form.Item
                            name={['photographer', 'firstname']}
                            style={{ margin: 0, width: '50%' }}
                            rules={[{ required: true, message: 'Vorname ist erforderlich' }]}
                        >
                            <Input placeholder="Vorname" size="small" />
                        </Form.Item>
                        <Form.Item
                            name={['photographer', 'lastname']}
                            style={{ margin: 0, width: '50%' }}
                            rules={[{ required: true, message: 'Nachname ist erforderlich' }]}
                        >
                            <Input placeholder="Nachname" size="small" />
                        </Form.Item>
                    </Input.Group>
                )
            ) : (
                children
            )}
        </td>
    );
};

export const PhotoList: React.FC = () => {
    const { albumId } = useParams();
    const { photosList, loading, photosListByAlbumIdFetch, deletePhotoById, updatePhoto } = PhotoService();

    useDebugMount("PhotosList");

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState<string>('');

    useEffect(() => {
        if (albumId) photosListByAlbumIdFetch(albumId).catch(console.error);
    }, []);

    const isEditing = (record: MethodGetPhotosListByAlbumIdResponseModel) => record.photoId === editingKey;

    const edit = (record: MethodGetPhotosListByAlbumIdResponseModel) => {
        form.setFieldsValue({
            title: record.title,
            photographer: {
                firstname: record.photographer?.firstname ?? '',
                lastname: record.photographer?.lastname ?? '',
            },
        });
        setEditingKey(record.photoId!);
    };

    const cancel = () => setEditingKey('');

    const save = (photoId: string) => {
        form.validateFields()
            .then(async ({ title, photographer }: { title: string; photographer: { firstname: string; lastname: string } }) => {
                await updatePhoto({
                    photoId,
                    title,
                    photographer,
                });
                setEditingKey('');
                if (albumId) await photosListByAlbumIdFetch(albumId);
                return message.success('Photo updated');
            })
            .catch(console.error);
    };

    const handleDelete = (photoId: string | undefined) => {
        if (!photoId) return;
        deletePhotoById(photoId)
            .then(async (photo) => {
                await photosListByAlbumIdFetch(photo.photoAlbumId);
                return message.success(`Photo ${photo?.title} deleted`);
            })
            .catch(console.error);
    };

    const columns: TableProps<MethodGetPhotosListByAlbumIdResponseModel>['columns'] = useMemo(() => ([
        {
            title: 'Title',
            dataIndex: 'title',
            align: 'center',
            editable: true as const,
            render: (title: string) => title,
            kind: 'title' as EditingKind,
        },
        {
            title: 'Fotograf',
            dataIndex: 'photographer',
            align: 'center',
            editable: true as const,
            render: (_: any, { photographer }) => (
                <span>{(photographer?.firstname ?? '') + ' ' + (photographer?.lastname ?? '')}</span>
            ),
            kind: 'photographer' as EditingKind,
        },
        {
            title: "Datum",
            dataIndex: 'createdAt',
            align: 'center',
            render: (_: any, { createdAt }) => formatDate(createdAt)
        },
        {
            title: 'Foto',
            dataIndex: 'base64',
            align: 'center',
            render: (base64: string) => (
                <Image
                    src={base64}
                    width={100}
                    height={70}
                    style={{ objectFit: 'cover', borderRadius: "5px" }}
                    preview={{}}
                />
            ),
        },
        {
            title: 'Action',
            align: 'center',
            render: (_: any, record) => {
                const editable = isEditing(record);
                return (
                    <Flex justify={"center"} wrap gap={"small"}>
                        {editable ? (
                            <>
                                <Typography.Link onClick={cancel}>Cancel</Typography.Link>
                                <Popconfirm title="Sure to Save?" onConfirm={() => save(record.photoId!)} style={{ marginRight: 8 }}>
                                    <a>Save</a>
                                </Popconfirm>
                            </>
                        ) : (
                            <>
                                <Typography.Link onClick={() => edit(record)}>Bearbeiten</Typography.Link>
                                {photosList.length >= 1 ? (
                                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.photoId)}>
                                        <a>Delete</a>
                                    </Popconfirm>
                                ) : null}
                            </>
                        )}
                    </Flex>
                );
            },
        },
    ]), [photosList, editingKey]);

    const mergedColumns: TableProps<MethodGetPhotosListByAlbumIdResponseModel>['columns'] =
        (columns as any).map((col: any) => {
            if (!col.editable) return col;
            return {
                ...col,
                onCell: (record: MethodGetPhotosListByAlbumIdResponseModel) => ({
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                    kind: col.kind as EditingKind,
                }),
            };
        });

    return (
        <Form form={form} component={false}>
            <Table<MethodGetPhotosListByAlbumIdResponseModel>
                style={{ margin: "20px 0" }}
                rowKey="photoId"
                columns={mergedColumns}
                dataSource={photosList}
                pagination={{ position: ["bottomCenter"], onChange: cancel }}
                loading={loading}
                components={{ body: { cell: EditableCell } }}
            />
        </Form>
    );
};
