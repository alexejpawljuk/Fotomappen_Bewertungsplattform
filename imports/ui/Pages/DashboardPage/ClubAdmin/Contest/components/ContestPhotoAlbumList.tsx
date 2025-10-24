import React, {useEffect, useMemo, useState} from 'react';
import {Flex, Form, Table, TableProps} from 'antd';
import {formatDate} from "/imports/utils/formatDate";
import {PhotoAlbum} from "/imports/api/PhotoAlbum/models";
import {useDebugMount} from "/imports/ui/hooks/useDebugMount";
import {PhotoAlbumService} from "/imports/ui/Services/PhotoAlbumService";
import {Link, useParams} from "react-router-dom";


export const ContestPhotoAlbumList: React.FC = () => {
    const {getPhotoAlbumsByContestId} = PhotoAlbumService();
    const [photoAlbum, setPhotoAlbum] = useState<PhotoAlbum[]>([])

    useDebugMount("ContestPhotoAlbumList");

    const {contestId} = useParams()
    const [form] = Form.useForm();

    useEffect(() => {
        if (!contestId) throw new Error("ContestId must be provided");
        getPhotoAlbumsByContestId({contestId})
            .then(setPhotoAlbum)
            .catch(console.error);
    }, []);

    const columns = useMemo<TableProps<PhotoAlbum>['columns']>(() => ([
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            editable: true as const,
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
            title: 'Bewertungslink',
            key: 'contestLink',
            align: 'center',
            render: (_: any) => (
                <Link to={"Link"}>Link</Link>
            ),
        },
    ]), [photoAlbum]);

    return (
        <Flex vertical gap={"small"}>
            <Form form={form} component={false}>
                <Table<PhotoAlbum>
                    rowKey="albumId"
                    pagination={{position: ["bottomCenter"]}}
                    columns={columns}
                    dataSource={photoAlbum}
                    style={{margin: '20px 0', minWidth: 700}}
                />
            </Form>
        </Flex>
    );
};
