import React from 'react';
import {DashboardLayout} from "/imports/ui/Pages/DashboardPage/DashboardLayout";
import {Button,Flex} from "antd";
import {AccountInfo} from "/imports/ui/Pages/DashboardPage/AccountInfo";
import { useNavigate } from "react-router-dom";
import {protectedRoutes} from "/imports/ui/Router/routes";

interface DashboardClubAdminLayoutProps {
    children?: React.ReactNode
}

export const DashboardSuperAdminLayout: React.FC<DashboardClubAdminLayoutProps> = ({children}) => {
    const navigate = useNavigate()

    const handelContest = () => {
        navigate(protectedRoutes.super_admin.dashboardContest.path)
    }

    const handleCommunity = () => {
        navigate(protectedRoutes.super_admin.dashboardCommunity.path)
    }

    return (
        <DashboardLayout>
            <Flex justify={"center"} align={"center"} wrap gap={"middle"} style={{height: "50px"}} >
                <Button color="primary" variant="outlined" onClick={handelContest}>Wettbewerb</Button>
                <Button color="primary" variant="outlined" onClick={handleCommunity}>Community</Button>
            </Flex>
            {children ?? <AccountInfo/>}
        </DashboardLayout>
    );
};