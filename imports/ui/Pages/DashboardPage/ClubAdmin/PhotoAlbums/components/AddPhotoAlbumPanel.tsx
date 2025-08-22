import React, {useState} from 'react';
import {Button, Flex, Input, message} from "antd";
import {PhotoAlbumError, PhotoAlbumStatus} from "/imports/utils/constans/text";
import {Meteor} from "meteor/meteor"
import {PhotoAlbumMethods} from "/imports/api/names";
import {MethodSetPhotoAlbumCreateModel} from "/imports/api/PhotoAlbum/models";
import {stringContainsOnlyLettersAndNumbers} from "/imports/utils/check";

interface CreatePhotoAlbumProps {
    // TODO: define props here
}

export const AddPhotoAlbumPanel: React.FC<CreatePhotoAlbumProps> = ({}) => {
    const [title, setTitle] = useState("")

    const handleCreate = async () => {
        const cleanTitle = title.trim()

        if (!stringContainsOnlyLettersAndNumbers(cleanTitle)) {
            return message.error(PhotoAlbumError.PHOTO_ALBUM_TITLE_INVALID)
        }

        if (cleanTitle.length < 3) {
            return message.error(PhotoAlbumError.PHOTO_ALBUM_TITLE_TO_SHORT);
        }

        if (cleanTitle.length > 16) {
            return message.error(PhotoAlbumError.PHOTO_ALBUM_TITLE_TO_LONG)
        }

        const data: MethodSetPhotoAlbumCreateModel = {
            title: cleanTitle,
        }

        try {
            await Meteor.callAsync(PhotoAlbumMethods.SET_PHOTO_ALBUM_CREATE, data)
            message.success(`"${cleanTitle}" ` + `${PhotoAlbumStatus.SUCCESS}`);
            setTitle("")
        } catch (e: unknown) {
            if (e instanceof Meteor.Error){
                return message.error(e.details || e.reason || e.message || "Unknown error")
            }
            return message.error((e as Error).message || JSON.stringify(e))
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
            ><legend>Neue Fotomappe erstellen</legend>

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