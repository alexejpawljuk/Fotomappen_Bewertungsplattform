import React from 'react';
import {Typography} from "antd";
import { Header } from "../Header/Header";

interface DashboardProps {
    // TODO: define props here
}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
    return (
        <div>
            <Header/>
            <Typography.Title level={2}>Dashboard</Typography.Title>
        </div>
    );
};