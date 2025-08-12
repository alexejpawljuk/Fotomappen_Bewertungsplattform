import React from 'react';
import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

interface Props {
    // define your props here
}

export const NotFoundPage: React.FC<Props> = ({}) => {
    const navigate = useNavigate()

    const handleBackHome = () => {
        navigate("/")
    }

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={handleBackHome}>Back Home</Button>}
        />
    );
};


