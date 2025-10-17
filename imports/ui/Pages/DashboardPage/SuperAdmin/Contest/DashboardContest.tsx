import React from 'react';
import {DashboardContentTitle} from "/imports/ui/Pages/DashboardPage/DashboardContentTitle";
import {DashboardSuperAdminLayout} from "/imports/ui/Pages/DashboardPage/SuperAdmin/DashboardSuperAdminLayout";

interface DashboardContestProps {
    // TODO: define props here
}

export const DashboardContest: React.FC<DashboardContestProps> = ({}) => {
    return (
        <DashboardSuperAdminLayout>
            <DashboardContentTitle title={"Wettbewerb"} />
        </DashboardSuperAdminLayout>
    );
};
