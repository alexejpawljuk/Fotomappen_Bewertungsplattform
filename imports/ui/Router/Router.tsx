import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Flex, Spin} from "antd";
import {protectedRoutes, publicRoutes} from "/imports/ui/Router/routes";
import {LoadingOutlined} from "@ant-design/icons";
import {Meteor} from "meteor/meteor";
import {useTracker} from "meteor/react-meteor-data";
import {User} from "/imports/api/User/models";


interface RouterProps {
    // TODO: define props here
}

/**
 * Defines the type for the user ID on login
 *
 * null - not logged in
 * undefined - loading data
 * string - logged in (user id)
 */
export const Router: React.FC<RouterProps> = ({}) => {

    const {userId, loggingIn} = useTracker(() => ({
        userId: Meteor.userId(),
        loggingIn: Meteor.loggingIn(),
    }), []);

    const user = useTracker(() => Meteor.user() as User | null);
    const userRole = user?.profile?.role;

    const allowedProtectedRoutes =
        Object.values(protectedRoutes)
            .filter(rout => rout.requiredRole === userRole)

    const routes = [...allowedProtectedRoutes, ...Object.values(publicRoutes)]

    if (userId === undefined || loggingIn) {
        return (
            <Flex justify={"center"} align={"center"} style={{height: "100%"}}>
                <Spin indicator={<LoadingOutlined style={{fontSize: 48}} spin/>}/>
            </Flex>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element}/>
                ))}
            </Routes>
        </BrowserRouter>
    );
};