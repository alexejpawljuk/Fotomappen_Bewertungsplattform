import React from 'react';
import {DashboardLayout} from "/imports/ui/Pages/DashboardPage/DashboardLayout";
import {Button,Flex} from "antd";
import {AccountInfo} from "/imports/ui/Pages/DashboardPage/AccountInfo";
import {useNavigate} from "react-router-dom";
import {protectedRoutes} from "/imports/ui/Router/routes";
import {useUserAccount} from "/imports/ui/hooks/useUserAccount";

interface DashboardClubAdminLayoutProps {
    children?: React.ReactNode
}

export const DashboardClubAdminLayout: React.FC<DashboardClubAdminLayoutProps> = ({children}) => {
    const navigate = useNavigate()
    const {user} = useUserAccount()

    const handlePhotoAlbums = () => {
        if (!user) return
        navigate(protectedRoutes.club_admin.dashboardPhotoAlbums.path)
    }

    return (
        <DashboardLayout>
            <Flex justify={"center"} align={"center"} wrap gap={"middle"} style={{height: "50px"}} >
                <Button>Wettbewerb</Button>
                <Button onClick={handlePhotoAlbums}>Fotomappen</Button>
            </Flex>
            {children ?? <AccountInfo/>}
        </DashboardLayout>
    );
};