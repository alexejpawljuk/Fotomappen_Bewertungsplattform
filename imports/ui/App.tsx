import React from 'react';
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ConfigProvider} from "antd";
import {protectedRoutes, publicRoutes} from "/imports/utils/constans/routes";
import {LoadingOutlined} from "@ant-design/icons";

/**
 * Defines the type for the user ID on login
 *
 * null - not logged in
 * undefined - loading data
 * string - logged in (user id)
 */
export type AppUserIdModel = string | undefined | null

export const App = () => {
    const userId: AppUserIdModel = useTracker(() => Meteor.userId())

    if (userId === null) {
        return (
            <BrowserRouter>
                <ConfigProvider>
                    <Routes>
                        {Object.values(publicRoutes).map((route) => (
                            <Route key={route.path} path={route.path} element={route.element} />
                        ))}
                    </Routes>
                </ConfigProvider>
            </BrowserRouter>
        )
    }

    if (userId === undefined) {
        return <LoadingOutlined/>
    }

    return (
        <BrowserRouter>
            <ConfigProvider>
                <Routes>
                    {Object.values(protectedRoutes).map((route) => (
                        <Route key={route.path} path={route.path} element={route.element} />
                    ))}
                </Routes>

                <Routes>
                    {Object.values(publicRoutes).map((route) => (
                        <Route key={route.path} path={route.path} element={route.element} />
                    ))}
                </Routes>
            </ConfigProvider>
        </BrowserRouter>
    )
}