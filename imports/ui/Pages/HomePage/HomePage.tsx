import React from 'react';
import {Typography} from "antd";
import {MainLayout} from "/imports/ui/Layout/MainLayout";

interface HomePageProps {
    // define your props here
}

export const HomePage: React.FC<HomePageProps> = ({}) => {

    return (
        <MainLayout>
            <Typography.Title level={2}>
                HomePage component
            </Typography.Title>
        </MainLayout>
    )
};


