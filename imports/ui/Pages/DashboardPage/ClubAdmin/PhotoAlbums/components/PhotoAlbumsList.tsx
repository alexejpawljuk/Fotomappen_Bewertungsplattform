import React, {CSSProperties, useEffect, useMemo} from 'react';
import {Flex, message, Popconfirm, Table, TableProps, Tag} from 'antd';
import {CheckCircleOutlined, ClockCircleOutlined, SyncOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import {formatDate} from "/imports/utils/formatDate";
import {MethodGetPhotoAlbumListResponseModel} from "/imports/api/PhotoAlbum/models";
import {generatePath, Link} from "react-router-dom";
import {protectedRoutes} from "/imports/ui/Router/routes";
import {useDebugMount} from "/imports/ui/hooks/useDebugMount";
import {PhotoAlbumService} from "/imports/ui/Services/PhotoAlbumService";


export const PhotoAlbumsList: React.FC = () => {
    const {photoAlbumsList, loading, photoAlbumsListFetch, photoAlbumDeleteById} = PhotoAlbumService()

    useDebugMount("PhotoAlbumsList")

    useEffect(() => {
        photoAlbumsListFetch()
            .catch(message.error);
    }, []);

    const handleDelete = (albumId: string) => {
        photoAlbumDeleteById(albumId)
            .then(async () => {
                const photoAlbum = photoAlbumsList.find(photoAlbum => photoAlbum.albumId === albumId);
                await photoAlbumsListFetch()
                if (photoAlbum) return message.success(`Fotomappe ${photoAlbum?.title} deleted`)
            })
            .catch(console.error);
    }


    const columns: TableProps<MethodGetPhotoAlbumListResponseModel>['columns'] = useMemo(() => {
        return [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                render: (_, {title, albumId}) =>
                    <Link
                        to={generatePath(protectedRoutes.club_admin.dashboardPhotoAlbum.path, {albumId})}>{title}</Link>
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
                dataIndex: 'numberOfPhotos',
                key: 'numberOfPhotos',
                align: 'center',
            },
            {
                title: 'Bewertung',
                dataIndex: 'rating',
                key: 'rating',
                align: 'center',
                render: (_, {contest, rating}) => {
                    if (contest.status === "Active" && rating !== null) {
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
                render: (_, {contest}) => {
                    const style: CSSProperties = {width: "115px"};
                    switch (contest.status) {
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
                render: (_, {albumId}) => (
                    <Flex justify={"center"} wrap gap={"small"}>
                        <a>Bearbeiten</a>
                        {photoAlbumsList.length >= 1 ? (
                            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(albumId)}>
                                <a>Delete</a>
                            </Popconfirm>
                        ) : null}
                    </Flex>
                ),
            },
        ]
    }, [photoAlbumsList])

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

            <Table<MethodGetPhotoAlbumListResponseModel>
                loading={loading}
                rowKey="albumId"
                pagination={{position: ["bottomCenter"]}}
                columns={columns}
                dataSource={photoAlbumsList}
                style={{minWidth: "375px"}}
                // scroll={{ y: 'calc(100vh - 300px)' }}
            />
        </Flex>
    )
}
