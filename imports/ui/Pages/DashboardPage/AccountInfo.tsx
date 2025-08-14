import React, {useMemo} from 'react';
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {User} from "/imports/api/User/models";
import {Descriptions, DescriptionsProps, Flex, message, Typography} from "antd";
import {UserMethods} from "/imports/api/names";
import {Verification} from "/imports/utils/constans/text";
import {isEmpty} from "validator";

interface AccountInfoProps {
    // TODO: define props here
}

export const AccountInfo: React.FC<AccountInfoProps> = ({}) => {
    const user = useTracker(() => Meteor.user() as User | null)
    const accountInfo: DescriptionsProps['items'] = useMemo(() => {
        if (!user) return [];

        const resendVerification = async () => {
            try {
                await Meteor.callAsync(UserMethods.GET_USER_SEND_VERIFICATION_EMAIL);
                message.success(Verification.SEND_VERIFICATION_EMAIL);
            } catch (e) {
                if (e instanceof Meteor.Error) {
                    message.error(e.reason || e.message);
                }
            }
        };

        return [
            {
                key: 'clubName', label: 'Club Name',
                children: isEmpty(user.profile?.clubName) ? '-' : user.profile?.clubName},
            {
                key: 'role', label: 'Role', children: user.profile?.role ?? '-'},
            {
                key: 'email', label: 'Email', children: user.emails?.[0]?.address ?? '-'},
            {
                key: 'varify', label: 'Email varified', children: user.emails?.[0]?.verified ? 'Ja' :
                    <a onClick={resendVerification}>E-Mail verifizieren</a>
            },
        ];
    }, [user]);
    return (
        <Flex justify={"center"} align={"center"} wrap gap={"middle"}>
            <Descriptions
                title={<Typography.Title level={4} style={{textAlign: "center"}}>Account info</Typography.Title>}
                items={accountInfo}
                column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
                bordered
            />
        </Flex>
    )
};