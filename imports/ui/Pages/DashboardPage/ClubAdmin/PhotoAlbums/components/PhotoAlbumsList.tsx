import React, {CSSProperties, useState} from 'react';
import {Flex, Popconfirm, Table, TableProps, Tag} from 'antd';
import Search from "antd/es/input/Search";
import {TableDataType} from "/imports/ui/Pages/DashboardPage/ClubAdmin/PhotoAlbums/models";
import {formatDate} from "/imports/utils/formatDate";
import {CheckCircleOutlined, ClockCircleOutlined, SyncOutlined} from "@ant-design/icons";


const tempTableData: TableDataType[] = [
    {
        _id: "1",
        userId: "1",
        key: '1',
        title: '1 Fotomappe',
        createdAt: new Date(),
        rating: 2,
        umberOfPhotos: 30,
        status: 'Active',
    },
    {
        _id: "2",
        userId: "2",
        key: '2',
        title: '2 Fotomappe',
        createdAt: new Date(),
        rating: 3.5,
        umberOfPhotos: 10,
        status: 'Inactive',
    },
    {
        _id: "3",
        userId: "3",
        key: '3',
        title: '3 Fotomappe',
        createdAt: new Date(),
        rating: 4.5,
        umberOfPhotos: 15,
        status: 'Pending',
    },
    {
        _id: "4",
        userId: "4",
        key: '4',
        title: '4 Fotomappe',
        createdAt: new Date(),
        rating: 5,
        umberOfPhotos: 15,
        status: 'Inactive',
    },
    {
        _id: "5",
        userId: "5",
        key: '5',
        title: '5 Fotomappe',
        createdAt: new Date(),
        rating: 1.5,
        umberOfPhotos: 15,
        status: 'Active',
    },
];


export const PhotoAlbumsList: React.FC = () => {
    const [data, _] = useState<TableDataType[]>(tempTableData);


    const handleDelete = (key: React.Key) => {
        console.log("delete key: ", key)
    }

    const columns: TableProps<TableDataType>['columns'] = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (_, {title}) => title,

        },
        {
            title: 'Datum',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (_, {createdAt}) =>
                formatDate(createdAt),
        },
        {
            title: 'Foto anzahl',
            dataIndex: 'umberOfPhotos',
            key: 'umberOfPhotos',
            align: 'center',
        },
        {
            title: 'Bewertung',
            dataIndex: 'rating',
            key: 'rating',
            align: 'center',
            render: (_, {status, rating}) => {
                if (status === "Active" && rating !== null) {
                    return rating ? `${rating} / 10` : '-'
                }
                return 'Nicht bewertet'
            }

        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            render: (_, {status}) => {
                const style: CSSProperties = {width: "115px"};
                switch (status) {
                    case "Active":
                        return <Tag style={style} icon={<CheckCircleOutlined/>} color="success">Bewertet</Tag>
                    case "Inactive":
                        return <Tag style={style} icon={<SyncOutlined spin/>} color="processing">Pending</Tag>
                    case "Pending":
                        return <Tag style={style} icon={<ClockCircleOutlined/>} color="default">Nicht bewertet</Tag>
                }
            }
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_, {key}) => (
                <Flex justify={"center"} wrap gap={"small"}>
                    <a>Bearbeiten</a>
                    {data.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(key)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null}
                </Flex>
            ),
        },
    ];

    return (
        <Flex vertical gap={"small"}>
            <Flex justify={"flex-end"}>
                <Search
                    placeholder="search"
                    loading={false}
                    allowClear
                    style={{ width: 'calc(100vw - 75%)', maxWidth: '300', margin: '0 20px 0 0'}}
                />
            </Flex>

            <Table<TableDataType>
                // loading={true}
                pagination={{position: ["bottomCenter"]}}
                columns={columns}
                dataSource={data}
                style={{minWidth: "375px"}}
                // scroll={{ y: 'calc(100vh - 300px)' }}
            />
        </Flex>
    )
}
