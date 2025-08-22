import React, {CSSProperties, useMemo, useState} from 'react';
import {Meteor} from "meteor/meteor";
import {useTracker} from "meteor/react-meteor-data";
import {Flex, Popconfirm, Table, TableProps, Tag} from 'antd';
import {CheckCircleOutlined, ClockCircleOutlined, SyncOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import {formatDate} from "/imports/utils/formatDate";
import {PhotoAlbumMethods, PhotoAlbumPublication} from "/imports/api/names";
import {MethodDeletePhotoAlbumByIdModel, MethodGetPhotoAlbumListModel} from "/imports/api/PhotoAlbum/models";
import {Link} from "react-router-dom";
import {protectedRoutes} from "/imports/ui/Router/routes";

export const PhotoAlbumsList: React.FC = () => {
    const [data, setData] = useState<MethodGetPhotoAlbumListModel[]>([])

    const {isLoading} = useTracker(() => {
        const handle = Meteor.subscribe(PhotoAlbumPublication.LIST, Meteor.userId())
        if (!handle.ready()) {
            return {
                isLoading: true,
            }
        }

        Meteor.call(PhotoAlbumMethods.GET_PHOTO_ALBUM_LIST, (err: any, res: MethodGetPhotoAlbumListModel[]) => {
            if (err) {
                setData([])
                return console.error(err)
            }
            setData(() => res)
        })

        return {
            isLoading: false,
        }
    });

    const handleDelete = (albumId: string) => {
        const params: MethodDeletePhotoAlbumByIdModel = {albumId}

        Meteor.call(PhotoAlbumMethods.DELETE_PHOTO_ALBUM_BY_ID, params, (err: any) => {
            if (err) {
                return console.error(err)
            }
        })
    }


    const columns: TableProps<MethodGetPhotoAlbumListModel>['columns'] = useMemo(() => {
        return [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                render: (_, {title, albumId}) =>
                    <Link to={protectedRoutes.club_admin.dashboardPhotoAlbum.path + albumId}>{title}</Link>,
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
                        {data.length >= 1 ? (
                            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(albumId)}>
                                <a>Delete</a>
                            </Popconfirm>
                        ) : null}
                    </Flex>
                ),
            },
        ]
    }, [data])

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

            <Table<MethodGetPhotoAlbumListModel>
                loading={isLoading}
                rowKey="albumId"
                pagination={{position: ["bottomCenter"]}}
                columns={columns}
                dataSource={data}
                style={{minWidth: "375px"}}
                // scroll={{ y: 'calc(100vh - 300px)' }}
            />
        </Flex>
    )
}
