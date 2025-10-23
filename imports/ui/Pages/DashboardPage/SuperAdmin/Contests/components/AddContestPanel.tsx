import React, {useState} from 'react';
import {Button, Flex, Input, message} from "antd";
import {useDebugMount} from "/imports/ui/hooks/useDebugMount";
import {DatePicker} from 'antd';
import type {Dayjs} from 'dayjs';
import {stringContainsOnlyLettersAndNumbers} from "/imports/utils/check";
import {ContestStatus, PhotoAlbumError} from "/imports/utils/constans/text";
import {ContestService} from "/imports/ui/Services/ContestService";
import {isBefore} from "validator";
import {MethodSetContestCreateRequestModel} from "/imports/api/Сontest/models";

type DateType = Dayjs | (Dayjs | null)[] | null
type DateStringType = string | string[]
type DateInputStatus = "warning" | "error" | undefined

const {RangePicker} = DatePicker;

export const AddContestPanel = ({}) => {
    useDebugMount("AddContestPanel")

    const {setContests, getContestsListFetch} = ContestService()
    const [title, setTitle] = useState("")
    const [submissionPhase, setSubmissionPhase] = useState<{ date: DateType, dateString: DateStringType }>()
    const [contestPhase, setContestPhase] = useState<{ date: DateType, dateString: DateStringType }>()
    const [dateInputStatus, setDateInputStatus] = useState<DateInputStatus>(undefined)

    const handleCreate = async () => {
        const cleanTitle = title.trim()
        setDateInputStatus(undefined)

        if (!stringContainsOnlyLettersAndNumbers(cleanTitle)) {
            return message.error(PhotoAlbumError.PHOTO_ALBUM_TITLE_INVALID)
        }

        if (cleanTitle.length < 3) {
            return message.error(PhotoAlbumError.PHOTO_ALBUM_TITLE_TO_SHORT);
        }

        if (cleanTitle.length > 16) {
            return message.error(PhotoAlbumError.PHOTO_ALBUM_TITLE_TO_LONG)
        }

        if (!contestPhase || !submissionPhase) {
            setDateInputStatus("error")
            return message.error("Error: Contests data failed.")
        }

        if (!isBefore((submissionPhase.dateString as string[])[1], (contestPhase.dateString as string[])[0])) {
            setDateInputStatus("warning")
            return message.error("Error: Invalid date string.")
        }

        const contestData: MethodSetContestCreateRequestModel = {
            title,
            submissionPhase: {
                date: {
                    start: (submissionPhase.dateString as string[])[0],
                    end: (submissionPhase.dateString as string[])[1],
                }
            },
            contestPhase: {
                date: {
                    start: (contestPhase.dateString as string[])[0],
                    end: (contestPhase.dateString as string[])[1],
                }
            }
        }
        setContests(contestData)
            .then(async () => {
                setTitle("")
                setSubmissionPhase(undefined)  // 🔹 Einreichungsphase zurücksetzen
                setContestPhase(undefined)     // 🔹 Wettbewerbsphase zurücksetzen
                await getContestsListFetch()
                return message.success(ContestStatus.SUCCESS)
            })
            .catch((err) => message.error(err.details || "Contests creation failed."))
            .catch(console.error);
    }

    const handleSubmissionPhase = (date: DateType, dateString: DateStringType) => {
        setSubmissionPhase({date, dateString})
    };

    const handleContestPhase = (date: DateType, dateString: DateStringType) => {
        setContestPhase({date, dateString})
    };

    // --- Gegenseitige Einschränkungen (zweiwegige Bindung) ---
    const submissionDates = Array.isArray(submissionPhase?.date) ? submissionPhase!.date as [Dayjs | null, Dayjs | null] : undefined
    const contestDates = Array.isArray(contestPhase?.date) ? contestPhase!.date as [Dayjs | null, Dayjs | null] : undefined

    const submissionEnd = submissionDates?.[1] || null
    const contestStart = contestDates?.[0] || null

    // Wettbewerbsdaten dürfen nicht ≤ Ende der Einreichungsphase liegen
    const disableContestDate = (current: Dayjs) => {
        if (!submissionEnd) return false
        // Tage ≤ submissionEnd deaktivieren
        return !!current && (current.isBefore(submissionEnd, 'day') || current.isSame(submissionEnd, 'day'))
    }

    // Einreichungsdaten dürfen nicht ≥ Beginn der Wettbewerbsphase liegen
    const disableSubmissionDate = (current: Dayjs) => {
        if (!contestStart) return false
        // Tage ≥ contestStart deaktivieren
        return !!current && (current.isAfter(contestStart, 'day') || current.isSame(contestStart, 'day'))
    }

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
                    <RangePicker
                        size="small"
                        status={dateInputStatus}
                        prefix="Einreichungsphase"
                        onChange={handleSubmissionPhase}
                        // zweiwegige Wertbindung
                        value={submissionDates}
                        // gegenseitige Begrenzungen
                        disabledDate={disableSubmissionDate}
                    />
                    <RangePicker
                        size="small"
                        status={dateInputStatus}
                        prefix="Wettbewerbsphase"
                        onChange={handleContestPhase}
                        // zweiwegige Wertbindung
                        value={contestDates}
                        // gegenseitige Begrenzungen
                        disabledDate={disableContestDate}
                    />
                </Flex>
            </fieldset>
        </Flex>
    )
}
