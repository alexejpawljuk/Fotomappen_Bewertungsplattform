import React, {useEffect, useMemo, useState} from 'react';
import {Contest} from "/imports/api/Сontest/models";
import {Descriptions, DescriptionsProps, Flex, Typography} from "antd";
import {useDebugMount} from "/imports/ui/hooks/useDebugMount";
import {ContestService} from "/imports/ui/Services/ContestService";
import { useParams } from "react-router-dom";
import {formatDate} from "/imports/utils/formatDate";

interface ContestsDetailsProps {
}

export const ContestsDetails: React.FC<ContestsDetailsProps> = ({}) => {
    const {contestId} = useParams()
    const [contest, setContest] = useState<Contest>()
    const {getContestById} = ContestService()

    useDebugMount("ContestsDetails")

    useEffect(() => {
        if (!contestId) return
        getContestById({contestId})
            .then(contest => setContest(contest))
            .catch(console.error)
    }, [contestId]);

    const accountInfo: DescriptionsProps['items'] = useMemo(() => {
        if (!contest) return [];


        return [
            {
                key: 'title',
                label: 'Title:',
                children: contest.title
            },
            {
                key: 'id',
                label: 'ID:',
                children: contest._id
            },
            {
                key: 'submissionPhase',
                label: 'Einreichungsphase:',
                children: contest.phases.submissionPhase.start + " : " + contest.phases.submissionPhase.end
            },
            {
                key: 'contestPhase',
                label: 'Wettbewerbsphase:',
                children: contest.phases.contestPhase.start + " : " + contest.phases.contestPhase.end
            },
            {
                key: 'createdAt',
                label: 'Erstellt am:',
                children: formatDate(contest.createdAt, "DD.MM.YYYY - HH:mm")
            },
        ];
    }, [contest]);

    return (
        <Flex justify={"center"} align={"center"} wrap gap={"middle"}>
            <Descriptions
                title={<Typography.Title level={4} style={{textAlign: "center"}}>Wettbewerb info</Typography.Title>}
                items={accountInfo}
                column={{xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2}}
                bordered
            />
        </Flex>
    )
};