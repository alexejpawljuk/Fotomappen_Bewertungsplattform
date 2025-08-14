import React from 'react';
import {useParams} from 'react-router-dom';
import {Accounts} from "meteor/accounts-base";
import {useEffect, useState} from "react";
import {Result} from "antd";
import {Verification} from "/imports/utils/constans/text";


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
                setTitle(Verification.ERROR)
            } else {
                setStatus("success")
                setTitle(Verification.SUCCESS)
            }
        })
    }, [token])

    if (status === null) {
        return <></>
    }

    return (
        <>
            {<Result status={status} title={title}/>}
        </>
    )

}

