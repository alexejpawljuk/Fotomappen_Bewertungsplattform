import React, {useEffect, useMemo, useState} from 'react';
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {User} from "/imports/api/User/models";
import {Descriptions, DescriptionsProps, Flex, message, Typography} from "antd";
import {UserMethods} from "/imports/api/names";
import {Verification} from "/imports/utils/constans/text";
import {isEmpty} from "validator";
import {CommunityService} from "/imports/ui/Services/CommunityService";
import {Community} from "/imports/api/community/models";
import {useDebugMount} from "/imports/ui/hooks/useDebugMount";

interface AccountInfoProps {
    // TODO: define props here
}

export const AccountInfo: React.FC<AccountInfoProps> = ({}) => {
    const user = useTracker(() => Meteor.user() as User | null)
    const [community, setCommunity] = useState<Community>()
    const {getCommunityById} = CommunityService()

    useDebugMount("AccountInfo")

    useEffect(() => {
        if (!user?._id) return
        getCommunityById({communityId: user?.profile?.communityId})
            .then(res => setCommunity(res?.community))
            .catch(err => message.error(err.details || "Community request failed."))
            .catch(console.error)
    }, []);

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
                children: isEmpty(user.profile?.clubName) ? '-' : user.profile?.clubName
            },
            {
                key: 'role', label: 'Role', children: user.profile?.role ?? '-'
            },
            {
                key: 'email', label: 'Email', children: user.emails?.[0]?.address ?? '-'
            },
            {
                key: 'community', label: 'Community', children: community?.name ?? "Undefined"
            },
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
                column={{xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2}}
                bordered
            />
        </Flex>
    )
};