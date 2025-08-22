import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {DashboardContentTitle} from "/imports/ui/Pages/DashboardPage/DashboardContentTitle";
import {AddFotoPanel} from "/imports/ui/Pages/DashboardPage/ClubAdmin/PhotoAlbum/components/AddFotoPanel";

interface DashboardPhotoAlbumProps {
    // TODO: define props here
}

export const DashboardPhotoAlbum: React.FC<DashboardPhotoAlbumProps> = ({}) => {
    const {albumId} = useParams();

    useEffect(() => {

    }, []);

    return (
        <div>
            <DashboardContentTitle title={"Fotomappe "+ albumId}/>

            <AddFotoPanel/>

        </div>
    );
};