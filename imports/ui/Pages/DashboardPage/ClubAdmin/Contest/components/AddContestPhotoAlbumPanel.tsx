import React, {useEffect, useMemo, useState} from 'react';
import {Button, Flex, Select, } from "antd";
import {PhotoAlbumService} from "/imports/ui/Services/PhotoAlbumService";
import {PhotoAlbum} from "/imports/api/PhotoAlbum/models";
import {useParams} from "react-router-dom";
import {ContestService} from "/imports/ui/Services/ContestService";

interface AddContestPhotoAlbumPanelProps {
    // TODO: define props here
}

type SelectProps = {
    label: string
    value: string
    disabled: boolean
}

export const AddContestPhotoAlbumPanel: React.FC<AddContestPhotoAlbumPanelProps> = ({}) => {
    const {contestId} = useParams();
    const {photoAlbumsList, photoAlbumsListFetch} = PhotoAlbumService()
    const {setPhotoAlbumToContest} = ContestService()
    const [selectedPhotoAlbumId, setSelectedPhotoAlbumId] = useState<PhotoAlbum["_id"]>(undefined)
    const selectOptions = useMemo<SelectProps[]>(() => photoAlbumsList.map<SelectProps>(album => ({
        label: album.title,
        value: album.albumId,
        disabled: !!album.contest.contestId
    })), [photoAlbumsList]);

    useEffect(() => {
        photoAlbumsListFetch().catch(console.error)
        console.log(contestId)
    }, []);

    const handelToParticipate = () => {
        if (!contestId || !selectedPhotoAlbumId) throw new Error("contestId and photoAlbumId must be provided");
        setPhotoAlbumToContest({contestId, photoAlbumId: selectedPhotoAlbumId})
            .then(() => photoAlbumsListFetch())
            .catch(console.error)
    }

    const onSearch = (search: string) => {
        console.log('search:', search);
    };

    return (
        <Flex justify={"center"} style={{margin: "20px 0 20px"}}>
            <fieldset
                style={{
                    border: "1px solid #d9d9d9",
                    borderRadius: "10px",
                    width: "50%",
                }}
            ><legend>Wettbewersteilnahme</legend>

                <Flex justify={"space-around"}>
                    <Select
                        showSearch
                        placeholder="Fotomappe auswählen"
                        optionFilterProp="label"
                        allowClear
                        style={{width:'185px'}}
                        onChange={setSelectedPhotoAlbumId}
                        onSearch={onSearch}
                        options={selectOptions}
                    />
                    <Button
                        color="primary"
                        variant="outlined"
                        size={"small"}
                        style={{width: "150px"}}
                        onClick={handelToParticipate}
                    >Teilnehmen</Button>
                </Flex>
            </fieldset>
        </Flex>
    )
};
