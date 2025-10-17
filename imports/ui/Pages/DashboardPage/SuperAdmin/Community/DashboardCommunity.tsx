import React from 'react';
import {DashboardContentTitle} from "/imports/ui/Pages/DashboardPage/DashboardContentTitle";
import {DashboardSuperAdminLayout} from "/imports/ui/Pages/DashboardPage/SuperAdmin/DashboardSuperAdminLayout";
import {AddCommunityPanel} from "/imports/ui/Pages/DashboardPage/SuperAdmin/Community/components/AddCommunityPanel";
import {CommunityList} from "/imports/ui/Pages/DashboardPage/SuperAdmin/Community/components/CommunityList";

interface DashboardCommunityProps {
    // TODO: define props here
}

export const DashboardCommunity: React.FC<DashboardCommunityProps> = ({}) => {
    return (
        <DashboardSuperAdminLayout>
            <DashboardContentTitle title={"Community"} />
            <AddCommunityPanel/>
            <CommunityList/>
        </DashboardSuperAdminLayout>
    );
};
