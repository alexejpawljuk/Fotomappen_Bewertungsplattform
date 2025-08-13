import React from 'react';
import {useParams} from 'react-router-dom';
import {Accounts} from "meteor/accounts-base";
import {useEffect, useState} from "react";
import {Result, Typography} from "antd";
import {VerificationStatus} from "/imports/utils/constans/text";


export const EmailVerifyPage = () => {
    const {token} = useParams();
    const [status, setStatus] = useState<"success" | "error" | null>(null)
    const [title, setTitle] = useState<string>("")

    useEffect(() => {
        if (!token) {
            return
        }
        Accounts.verifyEmail(token, (err) => {
            if (err) {
                setStatus("error")
                setTitle(VerificationStatus.ERROR)
            } else {
                setStatus("success")
                setTitle(VerificationStatus.SUCCESS)
            }
        })
    }, [token])

    return (
        <>
            {
                status === null ?
                    <Typography.Text>Loading...</Typography.Text> :
                    <Result status={status} title={title}/>
            }
        </>
    )

}

