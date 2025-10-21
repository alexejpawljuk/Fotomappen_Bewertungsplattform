import React from 'react';
import {DashboardContentTitle} from "/imports/ui/Pages/DashboardPage/DashboardContentTitle";
import {DashboardSuperAdminLayout} from "/imports/ui/Pages/DashboardPage/SuperAdmin/DashboardSuperAdminLayout";
import {AddContestPanel} from "/imports/ui/Pages/DashboardPage/SuperAdmin/Contest/components/AddContestPanel";
import {ContestList} from "/imports/ui/Pages/DashboardPage/SuperAdmin/Contest/components/ContestList";

interface DashboardContestProps {
    // TODO: define props here
}

export const DashboardContest: React.FC<DashboardContestProps> = ({}) => {
    return (
        <DashboardSuperAdminLayout>
            <DashboardContentTitle title={"Wettbewerb"} />
            <AddContestPanel/>
            <ContestList/>
        </DashboardSuperAdminLayout>
    );
};
