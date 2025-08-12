import React from 'react';
import {Flex, Layout} from 'antd';
import {MainHeader} from "/imports/ui/Layout/MainHeader";
const { Content } = Layout;

interface MainProps {
    children?: React.ReactNode
}

export const MainLayout: React.FC<MainProps> = ({children}) => {
    return (
        <Flex gap={"middle"} style={{height: "100%"}} wrap>
            <Layout style={{height: "100%"}}>
                <MainHeader/>
                <Content>{children}</Content>
            </Layout>
        </Flex>
    );
};