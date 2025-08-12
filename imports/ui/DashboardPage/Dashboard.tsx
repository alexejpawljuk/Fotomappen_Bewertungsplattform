import React, {useEffect} from 'react';
import {message, Typography} from "antd";
import {Header} from "../Header/Header";
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor"
import {VerificationStatus} from "/imports/utils/constans/text";

interface DashboardProps {
    // TODO: define props here
}

const useNotificationOfVerification = () => {
    const userId = useTracker(() => Meteor.userId());
    const verified = !!Meteor.user()?.emails?.[0]?.verified

    useEffect(() => {
        if (verified) return
        message.warning(VerificationStatus.UNVERIFIED)
    }, [userId]);
}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
    useNotificationOfVerification()

    return (
        <div>
            <Header/>
            <Typography.Title level={2}>Dashboard</Typography.Title>
        </div>
    );
};