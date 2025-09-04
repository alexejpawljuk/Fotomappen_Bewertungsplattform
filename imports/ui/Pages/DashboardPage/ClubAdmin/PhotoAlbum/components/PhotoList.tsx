import React, {useEffect, useMemo, useState} from 'react';
import {Table, Image, TableProps, Flex, Popconfirm, message} from 'antd';
import {
    MethodDeletePhotoByIdRequestModel, MethodDeletePhotoByIdResponseModel,
    MethodGetPhotosListByAlbumIdRequestModel,
    MethodGetPhotosListByAlbumIdResponseModel
} from "/imports/api/Photo/models";
import {formatDate} from "/imports/utils/formatDate";
import {useParams} from "react-router-dom";
import {Meteor} from "meteor/meteor";
import {PhotoMethods, PhotoPublication} from "/imports/api/names";
import {useTracker} from "meteor/react-meteor-data";


export const PhotoList: React.FC = () => {
    const {albumId} = useParams();
    const [photosList, setPhotosList] = useState<MethodGetPhotosListByAlbumIdResponseModel[]>([])
    const [loading, setLoading] = useState(false)

    const {isLoading} = useTracker(() => {
        console.log("Photo collection subscription loaded")

        const handle = Meteor.subscribe(PhotoPublication.LIST)
        if (!handle.ready()) {
            return {
                isLoading: true
            }
        }

        return {
            isLoading: false
        }
    });

    useEffect(() => {
        if (!albumId) return
        const params: MethodGetPhotosListByAlbumIdRequestModel = {
            albumId
        }

        setLoading(true)
        Meteor.call(PhotoMethods.GET_PHOTOS_LIST_BY_ALBUM_ID, params, (err: any, res: MethodGetPhotosListByAlbumIdResponseModel[]) => {
            if (err) {
                setPhotosList([])
                setLoading(false)
                return console.error(err)
            }
            setLoading(false)
            setPhotosList(() => res)
        });

    }, []);

    const handleDelete = (photoId: string | undefined) => {
        console.log("To delete: ", photoId);

        const params: MethodDeletePhotoByIdRequestModel = {
            photoId
        }

        Meteor.call(PhotoMethods.DELETE_PHOTO_BY_ID, params, (err: any, res: MethodDeletePhotoByIdResponseModel) => {
            if(err) return console.log(err)
            console.log("Delete response: ", res)
            message.success(`Photo ${res.photo.title} deleted`)
        });
    }


    const columns: TableProps<MethodGetPhotosListByAlbumIdResponseModel>['columns'] = useMemo(() => {
        return [
            {
                title: 'Title',
                dataIndex: 'title',
                align: 'center',
            },
            {
                title: 'Fotograf',
                dataIndex: 'photographer',
                align: 'center',
                render: (_, {photographer}) => (
                    <span>
                    {photographer.firstname + " " + photographer.lastname}
                </span>
                )
            },
            {
                title: "Datum",
                dataIndex: 'createdAt',
                align: 'center',
                render: (_, {createdAt}) =>
                    formatDate(createdAt)
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
                        style={{objectFit: 'cover', borderRadius: "5px"}}
                        preview={{

                        }}
                    />
                ),
            },
            {
                title: 'Action',
                align: 'center',
                render: (_, {photoId}) => (
                    <Flex justify={"center"} wrap gap={"small"}>
                        <a>Bearbeiten</a>
                        {photosList.length >= 1 ? (
                            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(photoId)}>
                                <a>Delete</a>
                            </Popconfirm>
                        ) : null}
                    </Flex>
                ),
            }
        ];
    }, [photosList])

    return <Table
        style={{margin: "20px 0"}}
        rowKey="photoId"
        columns={columns}
        dataSource={photosList}
        pagination={{position: ["bottomCenter"]}}
        loading={loading}
    />;
};