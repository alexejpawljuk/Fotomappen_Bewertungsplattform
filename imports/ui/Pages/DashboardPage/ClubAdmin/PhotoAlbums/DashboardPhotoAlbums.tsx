import React from 'react';
import {DashboardClubAdminLayout} from "/imports/ui/Pages/DashboardPage/ClubAdmin/DashboardClubAdminLayout";
import {DashboardContentTitle} from "/imports/ui/Pages/DashboardPage/DashboardContentTitle";
import {CreatePhotoAlbum} from "/imports/ui/Pages/DashboardPage/ClubAdmin/PhotoAlbums/components/CreatePhotoAlbum";
import {PhotoAlbumsList} from "/imports/ui/Pages/DashboardPage/ClubAdmin/PhotoAlbums/components/PhotoAlbumsList";

interface DashboardPhotoAlbumsProps {
    // TODO: define props here
}

export const DashboardPhotoAlbums: React.FC<DashboardPhotoAlbumsProps> = ({}) => {
    return (
        <DashboardClubAdminLayout>
            <DashboardContentTitle title={"Fotomappen"}/>
            <CreatePhotoAlbum/>
            <PhotoAlbumsList/>
        </DashboardClubAdminLayout>
    );
};