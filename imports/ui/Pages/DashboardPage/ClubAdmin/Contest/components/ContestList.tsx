import React, {useEffect, useMemo, useState} from 'react';
import {Table, Flex, TableProps, Form, Typography, Tag} from 'antd';
import {useDebugMount} from "/imports/ui/hooks/useDebugMount";
import {ContestService} from "/imports/ui/Services/ContestService";
import Search from "antd/es/input/Search";
import {MethodGetContestsListResponseModel} from "/imports/api/Сontest/models";
import {PhotoAlbum} from "/imports/api/PhotoAlbum/models";
import {isTodayInRange} from "/imports/utils/check";

export const ContestList: React.FC = () => {
    const {contestsListPaged, loading, getContestsListPagedFetch} = ContestService();
    const [form] = Form.useForm();

    useDebugMount("ContestList club admin");

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [rows, setRows] = useState<MethodGetContestsListResponseModel[]>([]); // замени any на твой тип Contest
    const [search, setSearch] = useState<string>("")

    const fetchPage = async (p = page, ps = pageSize, s = search) => {
        const res = await getContestsListPagedFetch({ page: p, pageSize: ps, search: s });
        setRows(res.items);
        setTotal(res.total);
        setPage(p);
        setPageSize(ps);
        setSearch(s);
    };

    useEffect(() => {
        fetchPage().catch(console.error);
    }, []);

    const handleSearch = (search: string) => {
        const cleanSearch = search.trim();

        fetchPage(page, pageSize, cleanSearch).catch(console.error);
    }

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
    ], [contestsListPaged]);

    return (
        <Flex vertical gap={"small"}>
            <Flex justify={"flex-end"}>
                <Search
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="search"
                    loading={false}
                    allowClear
                    style={{width: 'calc(100vw - 75%)', maxWidth: '300', margin: '0 20px 0 0'}}
                />
            </Flex>

            <Form form={form} component={false}>
                <Table<MethodGetContestsListResponseModel>
                    rowKey="contestId"
                    loading={loading}
                    columns={columns}
                    // pagination={{position: ["bottomCenter"], onChange: cancel}}
                    style={{margin: '20px 0', minWidth: 700}}
                    dataSource={rows}
                    pagination={{
                        current: page,
                        pageSize,
                        total,
                        showSizeChanger: true,
                        position: ["bottomCenter"],
                    }}
                    onChange={(pagination) => {
                        const p = pagination.current || 1;
                        const ps = pagination.pageSize || 10;
                        fetchPage(p, ps, search).catch(console.error);
                    }}
                />
            </Form>
        </Flex>
    );
};
