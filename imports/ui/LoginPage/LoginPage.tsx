import React, {useState} from 'react';
import {Button, Input, message, Space, Typography} from "antd";
import {LockOutlined} from "@ant-design/icons";
import {protectedRoutes, publicRoutes} from "/imports/utils/constans/routes";
import {useNavigate} from "react-router-dom";
import validator from "validator";
import {Meteor} from "meteor/meteor"
import {LoginError} from "/imports/utils/constans/text";
import {MainLayout} from "/imports/ui/Layout/MainLayout";

interface Props {
    // define your props here
}

export const LoginPage: React.FC<Props> = ({}) => {
    const [email, setEmail] = useState("pawljuk-alexej@hotmail.com")
    const [password, setPassword] = useState("0123456789")
    const navigate = useNavigate()

    const handleSubmit = () => {
        const cleanedEmail = email.trim()

        if(!validator.isEmail(cleanedEmail)) {
            return message.error(LoginError.EMAIL_INVALID)
        }

        if (password.length < 8) {
            return message.error(LoginError.PASSWORD_TOO_SHORT)
        }

        Meteor.loginWithPassword(cleanedEmail, password, (error) => {
            if(error) {
                return message.error(LoginError.INVALID_CREDENTIALS)
            }
            navigate(protectedRoutes.dashboard.path)
        })
    }

    return (
        <MainLayout>
            <Space direction="vertical">
                <Typography.Title level={2}>Log into your account</Typography.Title>

                <Input placeholder={"Email"} value={email} addonBefore={"@"} onChange={e => setEmail(e.target.value)}/>
                <Input.Password placeholder={"Password"} value={password} type={"password"} addonBefore={<LockOutlined />} onChange={e => setPassword(e.target.value)}/>

                <Button type="primary" onClick={handleSubmit}>Login</Button>

                <Typography>
                    Registration
                    <Button type="link" onClick={() => navigate(publicRoutes.signup.path)}>Sign up</Button>
                </Typography>
            </Space>
        </MainLayout>
    );
};