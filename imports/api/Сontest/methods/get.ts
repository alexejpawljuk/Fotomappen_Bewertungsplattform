import {Meteor} from "meteor/meteor";
import {AvailableCollectionNames, ContestMethods} from "/imports/api/names";
import {
    MethodGetContestsListPagedRequestModel,
    MethodGetContestsListResponseModel
} from "/imports/api/Сontest/models";
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


Meteor.methods({
    [ContestMethods.GET_CONTEST_LIST_PAGED]: async function (params: MethodGetContestsListPagedRequestModel = {}) {
        if (!this.userId) return noAuthError();

        const page = Math.max(1, params.page ?? 1);
        const pageSize = Math.max(1, Math.min(100, params.pageSize ?? 20));
        const skip = (page - 1) * pageSize;

        const match: Record<string, any> = {};

        if (params.search && params.search.trim() !== "") {
            const regex = new RegExp(params.search.trim(), "i"); // i = регистронезависимый
            match.$or = [
                { title: regex }
            ];
        }

        const sort = { createdAt: -1 as const };

        try {
            const raw = ContestCollection.rawCollection();

            const totalPromise = raw.countDocuments(match);

            const pipeline = [
                { $match: match },
                { $sort: sort },
                { $skip: skip },
                { $limit: pageSize },
                {
                    $lookup: {
                        from: AvailableCollectionNames.PHOTO_ALBUM,
                        localField: "_id",
                        foreignField: "contest.contestId",
                        as: "photo_albums",
                    },
                },
            ];

            const itemsPromise = raw.aggregate(pipeline, { allowDiskUse: true }).toArray();

            const [itemsRaw, total] = await Promise.all([itemsPromise, totalPromise]);

            const items = itemsRaw.map<MethodGetContestsListResponseModel>((contest) => ({
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
                result: undefined,
            }));

            return { items, total };
        } catch (error) {
            if (error instanceof Meteor.Error) {
                throw new Meteor.Error(error.message);
            }
            console.error(error);
            throw new Meteor.Error("INTERNAL_ERROR", "Failed to fetch contests");
        }
    }

});