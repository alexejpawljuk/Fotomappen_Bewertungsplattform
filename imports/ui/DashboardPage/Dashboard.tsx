import React, {useEffect} from 'react';
import {message, Typography} from "antd";
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor"
import {VerificationStatus} from "/imports/utils/constans/text";
import {MainLayout} from "/imports/ui/Layout/MainLayout";

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
        <MainLayout>
            <Typography.Title level={2}>
                Dashboard component
            </Typography.Title>
        </MainLayout>
    )
};