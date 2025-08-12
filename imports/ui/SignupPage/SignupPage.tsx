import React, {useEffect, useState} from 'react';
import {Button, Input, message, Select, Space, Typography} from "antd";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import {LockOutlined} from "@ant-design/icons";
import {publicRoutes} from "/imports/utils/constans/routes";
import {MethodSetClubAdminCreateModel} from "/imports/api/club_admin/models";
import {Meteor} from 'meteor/meteor';
import {Community} from "/imports/api/community/models";
import {SignupError, SignupStatus} from "/imports/utils/constans/text";
import {stringContainsOnlyLettersAndNumbers} from "/imports/utils/check";
import {MainLayout} from "/imports/ui/Layout/MainLayout";


interface Props {
    // define your props here
}

const useCommunity = (): Community[] => {
    const [community, setCommunity] = useState<Community[]>([])

    useEffect(() => {
        Meteor.callAsync("get.communityAll")
            .then(res => {
                setCommunity(() => res)
            })
            .catch((error: Meteor.Error) => {
                message.error(error.details || error.reason || error.message || "Unknown error")
            })
    }, [])

    return community
}

export const SignupPage: React.FC<Props> = ({}) => {
    const [email, setEmail] = useState("pawljuk-alexej@hotmail.com")
    const [clubName, setClubName] = useState("ClubName")
    const [communityId, setCommunityId] = useState("")
    const [password, setPassword] = useState("0123456789")
    const communityAll = useCommunity()
    const [_, setLoggingIn] = useState(false)
    const navigate = useNavigate()



    const handleSubmit = async () => {
        const cleanedEmail = email.trim()
        const cleanedClubName = clubName.trim()

        if(!validator.isEmail(cleanedEmail)) {
            return message.error(SignupError.EMAIL_INVALID)
        }

        if (cleanedClubName.length < 3) {
            return message.error(SignupError.CLUB_NAME_TOO_SHORT)
        }

        if (!stringContainsOnlyLettersAndNumbers(cleanedClubName)) {
            return message.error(SignupError.CLUB_NAME_INVALID_CHARS)
        }

        if (communityId === "") {
            return message.error(SignupError.COMMUNITY_REQUIRED)
        }

        if (password.length < 8) {
            return message.error(SignupError.PASSWORD_TOO_SHORT)
        }

        try {
            const data: MethodSetClubAdminCreateModel = {
                email: cleanedEmail,
                password,
                clubName: cleanedClubName,
                communityId,
            }

            await Meteor.callAsync("set.user.create", data)

            message.success(SignupStatus.SUCCESS)

            setLoggingIn(true)

            navigate(publicRoutes.login.path)
        } catch (e: unknown) {
            setLoggingIn(false)
            if (e instanceof Meteor.Error){
                return message.error(e.details || e.reason || e.message || "Unknown error")
            }
        }
    }

    return (
        <MainLayout>
            <Space direction="vertical">
                <Typography.Title level={2}>Create new account</Typography.Title>

                <Input
                    placeholder={"Email"}
                    value={email}
                    addonBefore={"@"}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input
                    placeholder={"Club Name"}
                    value={clubName}
                    onChange={e => setClubName(e.target.value)}
                />
                <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Search to Select"
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={communityAll.map(community => ({
                        value: community._id,
                        label: community.name,
                    }))}
                    onSelect={(value: string)  => setCommunityId(value)}
                />
                <Input.Password
                    placeholder={"Password"}
                    value={password} type={"password"}
                    prefix={<LockOutlined />}
                    onChange={e => setPassword(e.target.value)}
                />

                <Button type="primary" onClick={handleSubmit}>Sign Up</Button>

                <Typography>
                    Already have an account?
                    <Button type="link" onClick={() => navigate(publicRoutes.login.path)}>Login</Button>
                </Typography>
            </Space>
        </MainLayout>
    );
};