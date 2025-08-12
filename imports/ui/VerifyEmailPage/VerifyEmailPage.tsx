import React from 'react';
import {useParams} from 'react-router-dom';
import {Accounts} from "meteor/accounts-base";
import {useEffect, useState} from "react";
import {Result} from "antd";

export const VerifyEmailPage = () => {
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
                setTitle("E-Mail-Verifizierung fehlgeschlagen.")
            } else {
                setStatus("success")
                setTitle("E-Mail-Verifizierung erfolgreich abgeschlossen.")
            }
        })
    }, [token])

    return (
        <Result status={status} title={title}/>
    )
}

