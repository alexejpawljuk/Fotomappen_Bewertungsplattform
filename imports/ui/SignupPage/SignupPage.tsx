import React, {useEffect, useState} from 'react';
import {Button, Input, message, Select, Space, Typography} from "antd";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import {LockOutlined} from "@ant-design/icons";
import {publicRoutes} from "/imports/utils/constans/routes";
import {MethodSetClubAdminCreateModel} from "/imports/api/club_admin/models";
import {Meteor} from 'meteor/meteor';
import { Header } from "../Header/Header";
import {Community} from "/imports/api/community/models";


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
        const cleanedClubname = clubName.trim()

        if(!validator.isEmail(cleanedEmail)) {
            return message.error("Email is invalid")
        }

        if (cleanedClubname.length < 3) {
            return message.error("Username is too short")
        }

        if (communityId === "") {
            return message.error("Please select a community")
        }

        if (password.length < 8) {
            return message.error("Password is too short")
        }

        try {
            const data: MethodSetClubAdminCreateModel = {
                email: cleanedEmail,
                password,
                clubName: cleanedClubname,
                communityId,
            }

            await Meteor.callAsync("set.user.create", data)

            message.success("User created")

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
        <div>
            <Header/>
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
        </div>
    );
};