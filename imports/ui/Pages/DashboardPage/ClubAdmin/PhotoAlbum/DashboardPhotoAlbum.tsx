import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {DashboardContentTitle} from "/imports/ui/Pages/DashboardPage/DashboardContentTitle";
import {AddPhotoPanel} from "/imports/ui/Pages/DashboardPage/ClubAdmin/PhotoAlbum/components/AddPhotoPanel";
import {DashboardClubAdminLayout} from "/imports/ui/Pages/DashboardPage/ClubAdmin/DashboardClubAdminLayout";
import {PhotoList} from "/imports/ui/Pages/DashboardPage/ClubAdmin/PhotoAlbum/components/PhotoList";
import {PhotoAlbumService} from "/imports/ui/Services/PhotoAlbumService";
import {useDebugMount} from "/imports/ui/hooks/useDebugMount";


interface DashboardPhotoAlbumProps {
    // TODO: define props here
}

export const DashboardPhotoAlbum: React.FC<DashboardPhotoAlbumProps> = ({}) => {
    const {albumId} = useParams()
    const [title, setTitle] = useState("")
    const {getPhotoAlbumById} = PhotoAlbumService()

    useDebugMount("DashboardPhotoAlbum")

    useEffect(() => {
        if (!albumId) return setTitle("Title undefined")
        getPhotoAlbumById(albumId)
            .then(photoAlbum => setTitle(photoAlbum.title))
            .catch(console.error)
    }, [albumId]);

    return (
        <DashboardClubAdminLayout>
            <DashboardContentTitle title={"Fotomappe: " + title}/>
            <AddPhotoPanel/>
            <PhotoList/>
        </DashboardClubAdminLayout>
    );
};