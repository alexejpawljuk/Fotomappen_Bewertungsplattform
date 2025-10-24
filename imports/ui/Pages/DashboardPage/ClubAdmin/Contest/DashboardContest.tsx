import React, {useEffect, useState} from 'react';
import {DashboardContentTitle} from "/imports/ui/Pages/DashboardPage/DashboardContentTitle";
import {DashboardClubAdminLayout} from "/imports/ui/Pages/DashboardPage/ClubAdmin/DashboardClubAdminLayout";
import {useParams} from "react-router-dom";
import {useDebugMount} from "/imports/ui/hooks/useDebugMount";
import {ContestService} from "/imports/ui/Services/ContestService";
import {ContestsDetails} from "/imports/ui/Pages/DashboardPage/ClubAdmin/Contest/components/ContestsDetails";
import {
    AddContestPhotoAlbumPanel
} from "/imports/ui/Pages/DashboardPage/ClubAdmin/Contest/components/AddContestPhotoAlbumPanel";
import {
    ContestPhotoAlbumList
} from "/imports/ui/Pages/DashboardPage/ClubAdmin/Contest/components/ContestPhotoAlbumList";

interface DashboardContestProps {
    // TODO: define props here
}

export const DashboardContest: React.FC<DashboardContestProps> = ({}) => {
    const {contestId} = useParams()
    const [title, setTitle] = useState<string>()
    const {getContestById} = ContestService()

    useDebugMount("DashboardContest")

    useEffect(() => {
        if (!contestId) return
        getContestById({contestId})
            .then(({contest}) => setTitle(contest.title))
            .catch(console.error)
    }, [contestId]);

    return (
        <DashboardClubAdminLayout>
            <DashboardContentTitle title={"Wettbewerb details: " + title} />
            <ContestsDetails/>
            <AddContestPhotoAlbumPanel/>
            <ContestPhotoAlbumList/>
        </DashboardClubAdminLayout>
    );
};