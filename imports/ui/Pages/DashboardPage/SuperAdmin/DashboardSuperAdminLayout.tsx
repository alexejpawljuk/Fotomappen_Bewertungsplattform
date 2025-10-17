import React from 'react';
import {DashboardLayout} from "/imports/ui/Pages/DashboardPage/DashboardLayout";
import {Button,Flex} from "antd";
import {AccountInfo} from "/imports/ui/Pages/DashboardPage/AccountInfo";

interface DashboardClubAdminLayoutProps {
    children?: React.ReactNode
}

export const DashboardSuperAdminLayout: React.FC<DashboardClubAdminLayoutProps> = ({children}) => {

    return (
        <DashboardLayout>
            <Flex justify={"center"} align={"center"} wrap gap={"middle"} style={{height: "50px"}} >
                <Button>Wettbewerb</Button>
                <Button>Community</Button>
            </Flex>
            {children ?? <AccountInfo/>}
        </DashboardLayout>
    );
};