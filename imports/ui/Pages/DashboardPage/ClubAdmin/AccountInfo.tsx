import React, {useMemo} from 'react';
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {User} from "/imports/api/User/models";
import {Descriptions, DescriptionsProps, message} from "antd";
import {UserMethods} from "/imports/api/names";

interface AccountInfoProps {
    // TODO: define props here
}

export const AccountInfo: React.FC<AccountInfoProps> = ({}) => {
    const user = useTracker(() => Meteor.user() as User | null)
    const accountInfo: DescriptionsProps['items'] = useMemo(() => {
        if (!user) return [];

        const resendVerification = async () => {
            try {
                await Meteor.callAsync(UserMethods.POST_USER_SEND_VERIFICATION_EMAIL);
                message.success('Verification email sent!');
            } catch (e) {
                if (e instanceof Meteor.Error) {
                    message.error(e.reason || e.message);
                }
            }
        };

        return [
            { key: 'clubName', label: 'Club Name', children: user.profile?.clubName ?? '-' },
            { key: 'role', label: 'Role', children: user.profile?.role ?? '-' },
            { key: 'email', label: 'Email', children: user.emails?.[0]?.address ?? '-' },
            { key: 'varify', label: 'Email varified', children: user.emails?.[0]?.verified ? 'Ja' :
                    <a onClick={resendVerification}>verify</a>
            },
        ];
    }, [user]);
    return(
        <Descriptions title="Account Info" items={accountInfo} column={1}/>
    )
};