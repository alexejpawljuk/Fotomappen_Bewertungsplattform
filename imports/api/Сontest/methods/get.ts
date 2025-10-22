import {Meteor} from "meteor/meteor";
import {AvailableCollectionNames, ContestMethods} from "/imports/api/names";
import {MethodGetContestsListResponseModel} from "/imports/api/Сontest/models";
import {noAuthError} from "/imports/utils/serverErrors";
import {ContestCollection} from "/imports/api/Сontest/contestCollection";

Meteor.methods({
    [ContestMethods.GET_CONTEST_LIST]: async function () {
        if (!this.userId) return noAuthError()

        try {
            const result = await ContestCollection.rawCollection()
                .aggregate([
                    {
                        $lookup: {
                            from: AvailableCollectionNames.PHOTO_ALBUM,
                            localField: "_id",
                            foreignField: "contest.contestId",
                            as: "photo_albums"
                        }
                    },
                    {$sort: {createdAt: -1}}
                ])
                .toArray();

            return result.map<MethodGetContestsListResponseModel>(contest => ({
                contestId: contest._id,
                title: contest.title,
                submissionPhase: {
                    start: contest?.phases?.submissionPhase?.start,
                    end: contest?.phases?.submissionPhase?.end,
                },
                contestPhase: {
                    start: contest?.phases?.contestPhase?.start,
                    end: contest?.phases?.contestPhase?.end,
                },
                photo_albums: contest?.photo_albums || [],
                result: undefined
            }))
        } catch (error) {
            if (error instanceof Meteor.Error) {
                throw new Meteor.Error(error.message)
            }
            console.error(error)
        }
    }
})