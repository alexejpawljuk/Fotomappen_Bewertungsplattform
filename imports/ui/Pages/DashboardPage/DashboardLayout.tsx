import React, {useEffect} from 'react';
import {Flex, message, Typography} from "antd";
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor"
import {Verification} from "/imports/utils/constans/text";
import {MainLayout} from "/imports/ui/Layout/MainLayout";


interface DashboardProps {
    children?: React.ReactNode
}

const useNotificationOfVerification = () => {
    const { userId, verified, loggingIn } = useTracker(() => {
        const user = Meteor.user();
        return {
            userId: Meteor.userId(),
            verified: !!user?.emails?.[0]?.verified,
            loggingIn: Meteor.loggingIn(),
        };
    });

    useEffect(() => {
        if (loggingIn) return;
        if (!userId) return;
        if (verified) return;

        message.warning(Verification.UNVERIFIED);
    }, [userId, verified, loggingIn]);
}

export const DashboardLayout: React.FC<DashboardProps> = ({children}) => {
    useNotificationOfVerification()

    return (
        <MainLayout>
            <Flex justify={"center"}>
                <Typography.Title level={2}>Dashboard</Typography.Title>
            </Flex>
            {children}
        </MainLayout>
    )
};