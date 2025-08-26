import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {DashboardContentTitle} from "/imports/ui/Pages/DashboardPage/DashboardContentTitle";
import {AddPhotoPanel} from "/imports/ui/Pages/DashboardPage/ClubAdmin/PhotoAlbum/components/AddPhotoPanel";
import {DashboardClubAdminLayout} from "/imports/ui/Pages/DashboardPage/ClubAdmin/DashboardClubAdminLayout";
import {Meteor} from "meteor/meteor";
import {PhotoAlbumMethods} from "/imports/api/names";
import {
    MethodGetPhotoAlbumByIDRequestModel,
    MethodGetPhotoAlbumByIDResponseModel
} from "/imports/api/PhotoAlbum/models";
import {message} from "antd";

interface DashboardPhotoAlbumProps {
    // TODO: define props here
}

export const DashboardPhotoAlbum: React.FC<DashboardPhotoAlbumProps> = ({}) => {
    const {albumId} = useParams()
    const [title, setTitle] = useState("")

    useEffect(() => {
        if (!albumId) return

        const params: MethodGetPhotoAlbumByIDRequestModel = {
            albumId
        }
        Meteor.call(PhotoAlbumMethods.GET_PHOTO_ALBUM_BY_ID, params, (err: any, res: MethodGetPhotoAlbumByIDResponseModel) => {
            if (err) {
                console.error(err)
                return message.error(`Album with id ${albumId} not found`)
            }
            if (!res.photoAlbum) return message.error(`Album with id ${albumId} not found`)
            setTitle(res.photoAlbum.title)
        })
    }, [albumId]);

    return (
        <DashboardClubAdminLayout>
            <DashboardContentTitle title={"Fotomappe: " + title}/>

            <AddPhotoPanel/>

        </DashboardClubAdminLayout>
    );
};