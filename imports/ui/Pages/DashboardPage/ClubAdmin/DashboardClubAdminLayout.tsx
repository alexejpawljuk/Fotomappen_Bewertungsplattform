import React from 'react';
import {Button,Flex} from "antd";
import {protectedRoutes} from "/imports/ui/Router/routes";
import {useNavigate} from "react-router-dom";
import {DashboardLayout} from "/imports/ui/Pages/DashboardPage/DashboardLayout";
import {AccountInfo} from "/imports/ui/Pages/DashboardPage/AccountInfo";


interface DashboardClubAdminLayoutProps {
    children?: React.ReactNode
}

export const DashboardClubAdminLayout: React.FC<DashboardClubAdminLayoutProps> = ({children}) => {
    const navigate = useNavigate()

    const handlePhotoAlbums = () => {
        navigate(protectedRoutes.club_admin.dashboardPhotoAlbums.path)
    }

    return (
        <DashboardLayout>
            <Flex justify={"center"} align={"center"} wrap gap={"middle"} style={{height: "50px"}} >
                <Button color="primary" variant="outlined">Wettbewerb</Button>
                <Button color="primary" variant="outlined" onClick={handlePhotoAlbums}>Fotomappen</Button>
            </Flex>
            {children ?? <AccountInfo/>}
        </DashboardLayout>
    );
};