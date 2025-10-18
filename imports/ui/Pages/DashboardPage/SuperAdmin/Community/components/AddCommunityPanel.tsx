import React, { useState } from 'react';
import {Button, Flex, Input, message} from "antd";
import {useDebugMount} from "/imports/ui/hooks/useDebugMount";
import {stringContainsOnlyLettersAndNumbers} from "/imports/utils/check";
import {CommunityError} from "/imports/utils/constans/text";

interface AddCommunityPanelProps {
    // TODO: define props here
}

export const AddCommunityPanel: React.FC<AddCommunityPanelProps> = ({}) => {
    useDebugMount("AddCommunityPanel")
    const [title, setTitle] = useState("")

    const handleCreate = async () => {
        const cleanTitle = title.trim()

        if (!stringContainsOnlyLettersAndNumbers(cleanTitle)) {
            return message.error(CommunityError.COMMUNITY_TITLE_INVALID)
        }

        if (cleanTitle.length < 3) {
            return message.error(CommunityError.COMMUNITY_TITLE_TO_SHORT);
        }

        if (cleanTitle.length > 16) {
            return message.error(CommunityError.COMMUNITY_TITLE_TO_LONG)
        }
    }

    return (
        <Flex justify={"center"} style={{margin: "20px 0 20px"}}>
            <fieldset
                style={{
                    border: "1px solid #d9d9d9",
                    borderRadius: "10px",
                    width: "50%",
                }}
            ><legend>Neuer Community erstellen</legend>

                <Flex justify={"space-around"}>
                    <Input
                        placeholder="Title"
                        size={"small"}
                        style={{width: "150px"}}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Button
                        color="primary"
                        variant="outlined"
                        size={"small"}
                        style={{width: "150px"}}
                        onClick={handleCreate}
                    >erstellen</Button>
                </Flex>
            </fieldset>
        </Flex>
    )
};