import React from 'react';
import {ConfigProvider, message} from "antd";
import {MESSAGE_DURATION} from "/imports/ui/config";
import {Router} from "/imports/ui/Router/Router";

export const App = () => {
    message.config({duration: MESSAGE_DURATION})

    return (
        <ConfigProvider>
            <Router/>
        </ConfigProvider>
    )
}