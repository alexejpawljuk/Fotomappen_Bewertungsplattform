import React from 'react';
import {Button, Flex} from "antd";
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {useNavigate} from "react-router-dom";
import {Role} from "/imports/api/names";
import {User} from "/imports/api/User/models";
import {protectedRoutes, publicRoutes} from "/imports/ui/Router/routes";

const SignedOutActions = () => {
    const navigate = useNavigate()

    const handleRegistration = () => {
        navigate(publicRoutes.signup.path)
    }
    const handleLogin = () => {
        navigate(publicRoutes.login.path)
    }

    return (
        <Flex justify={"flex-end"} align={"center"}>
            <Button type={"link"} onClick={handleRegistration}>Registration</Button>
            <Button type={"link"} onClick={handleLogin}>Login</Button>
        </Flex>
    )
}

const SignedInActions = () => {
    const navigate = useNavigate()
    const user = useTracker(() => Meteor.user() as User | null)

    const handleDashboard = () => {
        if (!user) return
        const role = user?.profile?.role
        if (role === Role.SUPER_ADMIN) navigate(protectedRoutes.dashboardSuperAdmin.path)
        if (role === Role.CLUB_ADMIN) navigate(protectedRoutes.dashboardClubAdmin.path)
    }

    const handleLogout = () => {
        Meteor.logout((error) => {
            navigate(publicRoutes.home.path)
            if (error) console.error(error)
        })
    }

    return (
        <Flex justify={"flex-end"} align={"center"}>
            <Button type={"link"} onClick={handleDashboard}>Dashboard</Button>
            <Button type={"link"} onClick={handleLogout}>Logout</Button>
        </Flex>
    )
}

export const MainHeader = () => {
    const userId = useTracker(() => Meteor.userId())
    const navigate = useNavigate()

    const isAuthed = userId !== null

    const homeHandle = () => {
        navigate(publicRoutes.home.path)
    }

    return (
        <Flex style={{height: "65px", margin: "0 20px"}} justify={"space-between"}>
            <Flex justify={"flex-end"} align={"center"}>
                <Button type={"link"} onClick={homeHandle}>Home</Button>
            </Flex>
            {isAuthed ? <SignedInActions/> : <SignedOutActions/>}
        </Flex>
    );
};