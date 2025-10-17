import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {DashboardContentTitle} from "/imports/ui/Pages/DashboardPage/DashboardContentTitle";
import {AddPhotoPanel} from "/imports/ui/Pages/DashboardPage/ClubAdmin/PhotoAlbum/components/AddPhotoPanel";
import {DashboardClubAdminLayout} from "/imports/ui/Pages/DashboardPage/ClubAdmin/DashboardClubAdminLayout";
import {PhotoList} from "/imports/ui/Pages/DashboardPage/ClubAdmin/PhotoAlbum/components/PhotoList";
import {PhotoAlbumService} from "/imports/ui/Services/PhotoAlbumService";


interface DashboardPhotoAlbumProps {
    // TODO: define props here
}

export const DashboardPhotoAlbum: React.FC<DashboardPhotoAlbumProps> = ({}) => {
    const {albumId} = useParams()
    const [title, setTitle] = useState("")
    const {photoAlbumsList} = PhotoAlbumService()

    useEffect(() => {
        const album = photoAlbumsList.find(album => album.albumId === albumId)
        setTitle(album?.title ?? "Title undefined")
    }, [albumId]);

    return (
        <DashboardClubAdminLayout>
            <DashboardContentTitle title={"Fotomappe: " + title}/>
            <AddPhotoPanel/>
            <PhotoList/>
        </DashboardClubAdminLayout>
    );
};