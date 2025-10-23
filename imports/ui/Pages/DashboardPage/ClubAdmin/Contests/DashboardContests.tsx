import React from 'react';
import {DashboardContentTitle} from "/imports/ui/Pages/DashboardPage/DashboardContentTitle";
import {ContestList} from "/imports/ui/Pages/DashboardPage/ClubAdmin/Contests/components/ContestList";
import {DashboardClubAdminLayout} from "/imports/ui/Pages/DashboardPage/ClubAdmin/DashboardClubAdminLayout";

interface DashboardContestProps {
    // TODO: define props here
}

export const DashboardContests: React.FC<DashboardContestProps> = ({}) => {


    return (
        <DashboardClubAdminLayout>
            <DashboardContentTitle title={"Wettbewerbsliste"} />
            <ContestList/>
        </DashboardClubAdminLayout>
    );
};