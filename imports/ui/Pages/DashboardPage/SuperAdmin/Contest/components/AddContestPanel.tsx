import React, {useState} from 'react';
import {Button, Flex, Input, message} from "antd";
import {useDebugMount} from "/imports/ui/hooks/useDebugMount";
import {DatePicker} from 'antd';

const {RangePicker} = DatePicker;
import type {Dayjs} from 'dayjs';
import {stringContainsOnlyLettersAndNumbers} from "/imports/utils/check";
import {PhotoAlbumError} from "/imports/utils/constans/text";
import {ContestService} from "/imports/ui/Services/ContestService";
import {isBefore} from "validator";
import {MethodSetContestCreateRequestModel} from "/imports/api/Сontest/models";

type DateType = Dayjs | (Dayjs | null)[] | null
type DateStringType = string | string[]
type DateInputStatus =  "" | "warning" | "error" | undefined


export const AddContestPanel = ({}) => {
    useDebugMount("AddContestPanel")
    const {setContests} = ContestService()
    const [title, setTitle] = useState("")
    const [submissionPhase, setSubmissionPhase] = useState<{ date: DateType, dateString: DateStringType }>()
    const [contestPhase, setContestPhase] = useState<{ date: DateType, dateString: DateStringType }>()
    const [dateInputStatus, setDateInputStatus] = useState<DateInputStatus>("")


    const handleCreate = async () => {
        const cleanTitle = title.trim()
        setDateInputStatus("")

        if (!stringContainsOnlyLettersAndNumbers(cleanTitle)) {
            return message.error(PhotoAlbumError.PHOTO_ALBUM_TITLE_INVALID)
        }

        if (cleanTitle.length < 3) {
            return message.error(PhotoAlbumError.PHOTO_ALBUM_TITLE_TO_SHORT);
        }

        if (cleanTitle.length > 16) {
            return message.error(PhotoAlbumError.PHOTO_ALBUM_TITLE_TO_LONG)
        }

        //
        if (!contestPhase || !submissionPhase) {
            setDateInputStatus("error")
            return message.error("Error: Contest data failed.")
        }

        if (!isBefore(submissionPhase.dateString[1], contestPhase.dateString[0])) {
            setDateInputStatus("warning")
            return message.error("Error: Invalid date string.")
        }
        
        const contestData: MethodSetContestCreateRequestModel = {
            title,
            submissionPhase: {
                date: {
                    start: submissionPhase.dateString[0],
                    end: submissionPhase.dateString[1],
                }
            },
            contestPhase: {
                date: {
                    start: contestPhase.dateString[0],
                    end: contestPhase.dateString[1],
                }
            }
        }
        setContests(contestData)
            .then(() => {

            })
            .catch((err) => message.error(err.details || "Contest creation failed."))
            .catch(console.error);
    }

    const handleSubmissionPhase = (date: DateType, dateString: DateStringType) => {
        console.log("Einrichungsphase", date, dateString);
        setSubmissionPhase({date, dateString})
    };

    const handleContestPhase = (date: DateType, dateString: DateStringType) => {
        console.log("Wettbewerbsphase", date, dateString);
        setContestPhase({date, dateString})
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
                <legend>Neuer Wettbewerb erstellen</legend>

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
                <Flex justify={"space-around"} wrap style={{margin: "20px 0 10px"}}>
                    <RangePicker size="small" status={dateInputStatus} prefix="Einreichungsphase" onChange={handleSubmissionPhase}/>
                    <RangePicker size="small" status={dateInputStatus} prefix="Wettbewerbsphase" onChange={handleContestPhase}/>
                </Flex>
            </fieldset>
        </Flex>
    )
}