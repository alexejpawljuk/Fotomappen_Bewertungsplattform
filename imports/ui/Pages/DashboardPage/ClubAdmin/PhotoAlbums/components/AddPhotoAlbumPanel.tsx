import React, {useState} from 'react';
import {Button, Flex, Input, message} from "antd";
import {PhotoAlbumError, PhotoAlbumStatus} from "/imports/utils/constans/text";
import {MethodSetPhotoAlbumCreateRequestModel} from "/imports/api/PhotoAlbum/models";
import {stringContainsOnlyLettersAndNumbers} from "/imports/utils/check";
import {PhotoAlbumService} from "/imports/ui/Services/PhotoAlbumService";
import {useDebugMount} from "/imports/ui/hooks/useDebugMount";

interface CreatePhotoAlbumProps {
    // TODO: define props here
}

export const AddPhotoAlbumPanel: React.FC<CreatePhotoAlbumProps> = ({}) => {
    useDebugMount("AddPhotoAlbumPanel")
    const [title, setTitle] = useState("")
    const {createPhotoAlbum, photoAlbumsListFetch} = PhotoAlbumService()

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

        const data: MethodSetPhotoAlbumCreateRequestModel = {
            title: cleanTitle,
        }

        createPhotoAlbum(data)
            .then(async () => {
                setTitle("")
                await photoAlbumsListFetch()
                return message.success(`"${cleanTitle}" ` + `${PhotoAlbumStatus.SUCCESS}`);
            })
            .catch(console.error)
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