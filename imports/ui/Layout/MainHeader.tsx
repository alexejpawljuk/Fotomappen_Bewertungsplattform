import React from 'react';
import {Button, Flex} from "antd";
import {AppUserIdModel} from "/imports/ui/App";
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {useNavigate} from "react-router-dom";

const SignedOutActions = () => {
    const navigate = useNavigate()

    const handleRegistration = () => {
        navigate("/signup")
    }
    const handleLogin = () => {
        navigate("/login")
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
    const user = useTracker(() => Meteor.user())

    console.log(user)

    const handleLogout = () => {
        Meteor.logout((error) => {
            navigate("/")
            if (error) console.error(error)
        })
    }

    return (
        <Flex justify={"flex-end"} align={"center"}>
            <Button type={"link"} onClick={handleLogout}>Logout</Button>
        </Flex>
    )
}

export const MainHeader = () => {
    const userId: AppUserIdModel = useTracker(() => Meteor.userId())
    const navigate = useNavigate()

    const isAuthed = userId !== null

    const homeHandle = () => {
        navigate("/")
    }

    return (
        <Flex style={{height: "65px"}} justify={"space-between"}>
            <Flex justify={"flex-end"} align={"center"}>
                <Button type={"link"} onClick={homeHandle}>Home</Button>
            </Flex>
            {isAuthed ? <SignedInActions/> : <SignedOutActions/>}
        </Flex>
    );
};