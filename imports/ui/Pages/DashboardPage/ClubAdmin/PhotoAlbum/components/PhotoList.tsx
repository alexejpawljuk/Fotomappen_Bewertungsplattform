import React, {useEffect, useMemo} from 'react';
import {Table, Image, Flex, Popconfirm, message, TableProps} from 'antd';
import {MethodGetPhotosListByAlbumIdResponseModel} from "/imports/api/Photo/models";
import {formatDate} from "/imports/utils/formatDate";
import {useParams} from "react-router-dom";
import {useDebugMount} from "/imports/ui/hooks/useDebugMount";
import {PhotoService} from "/imports/ui/Services/PhotoService";

export const PhotoList: React.FC = () => {
    const {albumId} = useParams();
    const {photosList, loading, photosListByAlbumIdFetch, deletePhotoById} = PhotoService()

    useDebugMount("PhotosList")

    useEffect(() => {
        if (albumId) photosListByAlbumIdFetch(albumId).catch(console.error);
    }, []);

    const handleDelete = (photoId: string | undefined) => {
        if (photoId) {
            deletePhotoById(photoId)
                .then(async (photo) => {
                    await photosListByAlbumIdFetch(photoId)
                    return message.success(`Photo ${photo?.title} deleted`)
                })
                .catch(console.error);
        }
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
                        preview={{}}
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