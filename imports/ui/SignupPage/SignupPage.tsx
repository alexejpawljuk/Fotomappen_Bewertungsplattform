import React, {useState} from 'react';
import {Button, Input, message, Space, Typography} from "antd";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import {LockOutlined} from "@ant-design/icons";
import {publicRoutes} from "/imports/utils/constans/routes";
import {MethodSetClubAdminCreateModel} from "/imports/api/club_admin/models";
import {Meteor} from 'meteor/meteor';

interface Props {
    // define your props here
}

export const SignupPage: React.FC<Props> = ({}) => {
    const [email, setEmail] = useState("my_email@gmail.com")
    const [clubName, setClubName] = useState("ClubName")
    const [password, setPassword] = useState("0123456789")
    const navigate = useNavigate()

    const handleSubmit = async () => {
        const cleanedEmail = email.trim()
        const cleanedUsername = clubName.trim()

        if(!validator.isEmail(cleanedEmail)) {
            return message.error("Email is invalid")
        }

        if (cleanedUsername.length < 3) {
            return message.error("Username is too short")
        }

        if (password.length < 8) {
            return message.error("Password is too short")
        }

        try {
            const data: MethodSetClubAdminCreateModel = {
                email: cleanedEmail,
                password,
                clubName: cleanedUsername
            }

            await Meteor.callAsync("set.user.create", data)
            message.success("User created")
        } catch (e: unknown) {
            if (e instanceof Meteor.Error){
                return message.error(e.details || e.reason || e.message || "Unknown error")
            }
        }
    }

    return (
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
    );
};


