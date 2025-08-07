import React, {useState} from 'react';
import {Button, Input, message, Space, Typography} from "antd";
import {LockOutlined} from "@ant-design/icons";
import {publicRoutes} from "/imports/utils/constans/routes";
import {useNavigate} from "react-router-dom";
import validator from "validator";

interface Props {
    // define your props here
}

export const LoginPage: React.FC<Props> = ({}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = () => {
        const cleanedEmail = email.trim()

        if(!validator.isEmail(cleanedEmail)) {
            return message.error("Email is invalid")
        }

        if (password.length < 8) {
            return message.error("Password is too short")
        }
    }

    return (
        <Space direction="vertical">
            <Typography.Title level={2}>Log into your account</Typography.Title>

            <Input placeholder={"email"} value={email} addonBefore={"@"} onChange={e => setEmail(e.target.value)}/>
            <Input.Password placeholder={"Password"} value={password} type={"password"} prefix={<LockOutlined />} onChange={e => setPassword(e.target.value)}/>

            <Button type="primary" onClick={handleSubmit}>Login</Button>

            <Typography>
                Registration
                <Button type="link" onClick={() => navigate(publicRoutes.signup.path)}>Login</Button>
            </Typography>
        </Space>
    );
};