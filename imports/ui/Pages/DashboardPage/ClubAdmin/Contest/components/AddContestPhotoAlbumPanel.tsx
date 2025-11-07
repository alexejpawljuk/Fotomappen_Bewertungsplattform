import React, {useEffect, useMemo, useState} from 'react';
import {Button, Flex, Select,} from "antd";
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
    const {photoAlbumsList, photoAlbumsListFetch, getPhotoAlbumsByContestId} = PhotoAlbumService()
    const {setPhotoAlbumToContest} = ContestService()
    const [selectedPhotoAlbum, setSelectedPhotoAlbum] = useState<PhotoAlbum>({} as PhotoAlbum)

    const selectOptions = useMemo<SelectProps[]>(() => photoAlbumsList.map<SelectProps>(album => ({
        label: album.title,
        value: album.albumId,
        disabled: !!album.contest.contestId
    })), [photoAlbumsList]);

    useEffect(() => {
        photoAlbumsListFetch().catch(console.error)
        getPhotoAlbumsByContestId({contestId: contestId as string})
            .then(albums => {
                if (albums.length > 1) return Promise.reject("There are multiple photo albums from the same club participating in the contest");
                if (albums.length > 0) setSelectedPhotoAlbum(albums[0]);
            })
            .catch(console.error)
    }, []);

    const handelAddAlbumToParticipate = () => {
        if (!contestId || !selectedPhotoAlbum?._id) throw new Error("contestId and photoAlbumId must be provided");
        setPhotoAlbumToContest({contestId, photoAlbumId: selectedPhotoAlbum._id})
            // .then(() => photoAlbumsListFetch())
            // .catch(err => message.error(err.details || err.error))
            .catch(console.error)
    }

    const handelRemoveAlbumFromParticipate = () => {
        if (!contestId || !selectedPhotoAlbum?._id) throw new Error("contestId and photoAlbumId must be provided");

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
            >
                <legend>Wettbewersteilnahme</legend>

                <Flex justify={"space-around"}>
                    <Select
                        showSearch
                        placeholder="Fotomappe auswählen"
                        optionFilterProp="label"
                        allowClear
                        style={{width: '185px'}}
                        onChange={value => setSelectedPhotoAlbum({...selectedPhotoAlbum, _id: value})}
                        onSearch={onSearch}
                        options={selectOptions}
                        value={selectedPhotoAlbum.title}
                        disabled={!!selectedPhotoAlbum?._id ?? false}
                    />
                    {!!selectedPhotoAlbum?._id ?
                        <Button
                            color="primary"
                            variant="outlined"
                            size={"small"}
                            style={{width: "150px"}}
                            onClick={handelRemoveAlbumFromParticipate}
                        >Austreten</Button> :
                        <Button
                            color="primary"
                            variant="outlined"
                            size={"small"}
                            style={{width: "150px"}}
                            onClick={handelAddAlbumToParticipate}
                        >Teilnehmen</Button>}
                </Flex>
            </fieldset>
        </Flex>
    )
};
