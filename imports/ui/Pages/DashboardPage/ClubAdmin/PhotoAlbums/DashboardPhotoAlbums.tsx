import React from 'react';
import {DashboardClubAdminLayout} from "/imports/ui/Pages/DashboardPage/ClubAdmin/DashboardClubAdminLayout";

interface DashboardPhotoAlbumsProps {
    // TODO: define props here
}

export const DashboardPhotoAlbums: React.FC<DashboardPhotoAlbumsProps> = ({}) => {
    return (
        <DashboardClubAdminLayout>
            <h1>Fotomappen</h1>
        </DashboardClubAdminLayout>
    );
};