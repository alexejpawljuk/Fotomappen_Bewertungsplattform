import React from 'react';
import {useParams} from "react-router-dom";

interface DashboardPhotoAlbumProps {
    // TODO: define props here
}

export const DashboardPhotoAlbum: React.FC<DashboardPhotoAlbumProps> = ({}) => {
    const {albumId} = useParams();

    return (
        <div>
            <h1>Photo Album</h1>
            <h2>{albumId}</h2>
        </div>
    );
};