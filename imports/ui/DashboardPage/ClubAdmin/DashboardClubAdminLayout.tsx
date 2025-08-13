import React, {useMemo} from 'react';
import {DashboardLayout} from "/imports/ui/DashboardPage/DashboardLayout";
import {Button, Descriptions, DescriptionsProps, Flex} from "antd";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import {User} from "/imports/api/User/models";

interface DashboardClubAdminLayoutProps {
    children?: React.ReactNode
}

const AccountInfo = () => {
    const user = useTracker(() => Meteor.user() as User | null)
    const accountInfo: DescriptionsProps['items'] = useMemo(() => {
        if (!user) return [];
        return [
            { key: 'clubName', label: 'Club Name', children: user.profile?.clubName ?? '-' },
            { key: 'role', label: 'Role', children: user.profile?.role ?? '-' },
            { key: 'email', label: 'Email', children: user.emails?.[0]?.address ?? '-' },
            { key: 'varify', label: 'Email varified', children: user.emails?.[0]?.verified ? 'Ja' : 'Nein' },
            // добавь другие поля по необходимости
        ];
    }, [user]);
    return(
        <Descriptions title="Account Info" items={accountInfo} />
    )
}

export const DashboardClubAdminLayout: React.FC<DashboardClubAdminLayoutProps> = ({children}) => {

    return (
        <DashboardLayout>
            <Flex justify={"center"} align={"center"} wrap gap={"middle"} style={{height: "50px"}} >
                <Button>Wettbewerb</Button>
                <Button>Fotomappen</Button>
            </Flex>
            {children ?? <AccountInfo/>}
        </DashboardLayout>
    );
};