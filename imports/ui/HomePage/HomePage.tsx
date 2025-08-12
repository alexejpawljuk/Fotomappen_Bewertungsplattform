import React from 'react';
import {Typography} from "antd";
import {Header}  from "../Header/Header";

interface HomePageProps {
    // define your props here
}

export const HomePage: React.FC<HomePageProps> = ({}) => {

    return (
        <div>
            <Header/>
            <Typography.Title level={2}>
                HomePage component
            </Typography.Title>
        </div>
    );
};


