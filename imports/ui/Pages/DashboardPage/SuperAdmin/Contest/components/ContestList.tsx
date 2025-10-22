import React, {useEffect, useMemo, useState} from 'react';
import {Table, Flex, Popconfirm, message, TableProps, Form, Input, Typography, Tag} from 'antd';
import {useDebugMount} from "/imports/ui/hooks/useDebugMount";
import {ContestService} from "/imports/ui/Services/ContestService";
import Search from "antd/es/input/Search";
import {MethodGetContestsListResponseModel} from "/imports/api/Сontest/models";
import {PhotoAlbum} from "/imports/api/PhotoAlbum/models";
import {isTodayInRange} from "/imports/utils/check";

const EditableCell: React.FC<React.PropsWithChildren<{
    editing: boolean;
    dataIndex: 'title';
    title: React.ReactNode;
    record: MethodGetContestsListResponseModel;
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
                    <Input autoFocus size="small" style={{width: 160}}/>
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export const ContestList: React.FC = () => {
    const {contestsList, loading, getContestsListFetch, deleteContest} = ContestService();

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState<string>('');

    useDebugMount("ContestList");

    useEffect(() => {
        getContestsListFetch()
            .catch(err => message.error(err.details || "Error: Contest list fetch failed"))
            .catch(console.error);
    }, []);

    const isEditing = (record: MethodGetContestsListResponseModel) => record.contestId === editingKey;

    const edit = (record: MethodGetContestsListResponseModel) => {
        form.setFieldsValue({title: record.title});
        setEditingKey(record.contestId);
    };

    const cancel = () => setEditingKey('');

    const save = (id: string) => {
        console.log(id)
        form.validateFields()
            .then(async () => {
                setEditingKey('');
                return message.success('Title updated');
            })
            .catch(console.error);
    };

    const handleDelete = (id: string) => {
        deleteContest({id})
            .then(() => {
                return message.success('Competition deleted');
            })
            .catch(console.error);
    };

    const columns = useMemo<TableProps<MethodGetContestsListResponseModel>['columns']>(() => [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            editable: true as const,
            render: (title: string) => <Typography.Text>{title}</Typography.Text>,
        },
        {
            title: 'Einreichungsphase',
            dataIndex: 'submissionPhase',
            key: 'submissionPhase',
            align: 'center',
            render: (value: any) => {
                const dateToString = `${value.start} : ${value.end}`;

                if (isTodayInRange(value.start, value.end)) {
                    return <Tag color="success">{dateToString}</Tag>;
                }
                return <Tag bordered={false}>{dateToString}</Tag>;
            },
        },
        {
            title: 'Wettbewerbsphase',
            dataIndex: 'contestPhase',
            key: 'contestPhase',
            align: 'center',
            render: (value: any) => {
                const dateToString = `${value.start} : ${value.end}`;
                if (isTodayInRange(value.start, value.end)) {
                    return <Tag color="success">{dateToString}</Tag>;
                }
                return <Tag bordered={false}>{dateToString}</Tag>;
            },
        },
        {
            title: 'Photo albums',
            dataIndex: 'photo_albums',
            key: 'photo_albums',
            align: 'center',
            render: (photo_albums: PhotoAlbum[]) => {
                if (!photo_albums.length) return 0
                return <a>{photo_albums.length}</a>
            },
        },
        {
            title: 'Auswertung',
            dataIndex: 'result',
            key: 'result',
            align: 'center',
            render: (link: string) => {
                if (!link) return (<Tag color="processing">processing</Tag>)
                return (
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        Auswertung
                    </a>
                )
            },
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_: any, record) => {
                const editable = isEditing(record);
                return (
                    <Flex justify="center" gap="small">
                        {editable ? (
                            <>
                                <Typography.Link onClick={cancel}>Cancel</Typography.Link>
                                <Popconfirm title="Save changes?" onConfirm={() => save(record.contestId)}>
                                    <a>Save</a>
                                </Popconfirm>
                            </>
                        ) : (
                            <>
                                <Typography.Link onClick={() => edit(record)}>Bearbeiten</Typography.Link>
                                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.contestId)}>
                                    {/*<Button disabled type="link">Delete</Button>*/}
                                    {
                                        isTodayInRange(record.submissionPhase.start, new Date().toISOString()) ?
                                            "Delete" :
                                            <Typography.Link>Delete</Typography.Link>
                                    }
                                </Popconfirm>
                            </>
                        )}
                    </Flex>
                );
            },
        },
    ], [contestsList, editingKey]);

    const mergedColumns: TableProps<MethodGetContestsListResponseModel>['columns'] =
        (columns as any).map((col: any) => {
            if (!col.editable) return col;
            return {
                ...col,
                onCell: (record: MethodGetContestsListResponseModel) => ({
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
                <Table<MethodGetContestsListResponseModel>
                    components={{body: {cell: EditableCell}}}
                    rowKey="contestId"
                    loading={loading}
                    dataSource={contestsList}
                    columns={mergedColumns}
                    pagination={{position: ["bottomCenter"], onChange: cancel}}
                    style={{margin: '20px 0', minWidth: 700}}
                />
            </Form>
        </Flex>
    );
};
