import React from 'react';
import {DashboardContentTitle} from "/imports/ui/Pages/DashboardPage/DashboardContentTitle";
import {DashboardSuperAdminLayout} from "/imports/ui/Pages/DashboardPage/SuperAdmin/DashboardSuperAdminLayout";
import {ContestList} from "/imports/ui/Pages/DashboardPage/SuperAdmin/Contest/components/ContestList";
import { AddContestPanel } from "./components/AddContestPanel";

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
