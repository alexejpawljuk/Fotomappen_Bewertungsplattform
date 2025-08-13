import React from 'react';
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ConfigProvider, message} from "antd";
import {protectedRoutes, publicRoutes} from "/imports/utils/constans/routes";
import {LoadingOutlined} from "@ant-design/icons";
import {MESSAGE_DURATION} from "/imports/ui/config";


/**
 * Defines the type for the user ID on login
 *
 * null - not logged in
 * undefined - loading data
 * string - logged in (user id)
 */
export type AppUserIdModel = string | undefined | null

export const App = () => {
    // @ts-ignore
    const { userId, loggingIn } = useTracker(() => ({
        userId: Meteor.userId(),
        loggingIn: Meteor.loggingIn(),
    }), []);
    message.config({duration: MESSAGE_DURATION})

    const routes = [
        ...(userId === null ?
            [...Object.values(publicRoutes)] :
            [...Object.values(protectedRoutes), ...Object.values(publicRoutes)])
    ]

    if (userId === undefined) {
        return <LoadingOutlined/>
    }

    return (
        <BrowserRouter>
            <ConfigProvider>
                <Routes>
                    {routes.map((route) => (
                        <Route key={route.path} path={route.path} element={route.element}/>
                    ))}
                </Routes>
            </ConfigProvider>
        </BrowserRouter>
    )
}