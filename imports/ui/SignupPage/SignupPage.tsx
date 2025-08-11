import React, {useState} from 'react';
import {Button, Input, message, Space, Typography} from "antd";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import {LockOutlined} from "@ant-design/icons";
import {publicRoutes} from "/imports/utils/constans/routes";

interface Props {
    // define your props here
}

export const SignupPage: React.FC<Props> = ({}) => {
    const [email, setEmail] = useState("")
    const [clubName, setClubName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = () => {
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


