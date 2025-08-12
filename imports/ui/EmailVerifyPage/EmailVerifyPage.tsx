import React from 'react';
import {useParams} from 'react-router-dom';
import {Accounts} from "meteor/accounts-base";
import {useEffect, useState} from "react";
import {Result} from "antd";
import {VerificationStatus} from "/imports/utils/constans/text";

export const EmailVerifyPage = () => {
    const {token} = useParams();
    const [status, setStatus] = useState<"success" | "error">("success")
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
        <Result status={status} title={title}/>
    )
}

