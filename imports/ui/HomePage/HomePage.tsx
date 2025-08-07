import React from 'react';
import {Typography} from "antd";

interface Props {
    // define your props here
}

export const HomePage: React.FC<Props> = ({}) => {
    return (
        <Typography.Title level={2}>
            HomePage component
        </Typography.Title>
    );
};


