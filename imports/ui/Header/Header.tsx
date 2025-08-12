import React from 'react';
import {Button, Flex} from "antd";
import {useNavigate} from "react-router-dom";
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {AppUserIdModel} from "/imports/ui/App";

interface HeaderProps {
    // TODO: define props here
}

const IsNoAuthed = () => {
    const navigate = useNavigate()

    const handleRegistration = () => {
        navigate("/signup")
    }
    const handleLogin = () => {
        navigate("/login")
    }

    return (
        <Flex style={{}} justify={"flex-end"} align={"center"}>
            <Button type={"link"} onClick={handleRegistration}>Registration</Button>
            <Button type={"link"} onClick={handleLogin}>Login</Button>
        </Flex>
    )
}

const IsAuthed = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        Meteor.logout()
        navigate("/")
    }

    return(
        <Flex style={{}} justify={"flex-end"} align={"center"}>
            <Button type={"link"} onClick={handleLogout}>Logout</Button>
        </Flex>
    )
}

export const Header: React.FC<HeaderProps> = ({}) => {
    const userId: AppUserIdModel = useTracker(() => Meteor.userId())
    const navigate = useNavigate()

    const isAuthed = userId !== null

    const homeHandle = () => {
        navigate("/")
    }

    return (
        <div>
            <Flex justify={"space-between"}>
                <Flex style={{}} justify={"flex-end"} align={"center"}>
                    <Button type={"link"} onClick={homeHandle}>Home</Button>
                </Flex>
                {isAuthed ? <IsAuthed/> : <IsNoAuthed/>}
            </Flex>
        </div>
    )
}