import React from 'react';
import {Flex, Typography} from "antd";

interface DashboardContentTitleProps {
    title: string
}

export const DashboardContentTitle: React.FC<DashboardContentTitleProps> = ({title}) => {
    return (
        <Flex justify={"center"} style={{margin: "20px 0 20px"}}>
            <Typography.Title level={3}>{title}</Typography.Title>
        </Flex>
    );
};