import {Meteor} from "meteor/meteor";
import {CommunityCollection} from "/imports/api/community/communityCollection";
import {CommunityMethods} from "/imports/api/names";
import {
    Community,
    MethodGetCommunitiesAllResponseModel,
    MethodGetCommunityByIdRequestModel,
    MethodGetCommunityByIdResponseModel, MethodGetCommunityListResponseModel
} from "/imports/api/community/models";
import {noAuthError} from "/imports/utils/serverErrors";
import {check} from "meteor/check";


Meteor.methods({
    [CommunityMethods.GET_COMMUNITY_ALL]: function (): MethodGetCommunitiesAllResponseModel {
        const communities = CommunityCollection.find().fetch()
        return {communities}
    }
})

Meteor.methods({
    [CommunityMethods.GET_COMMUNITY_BY_ID]: function ({communityId}: MethodGetCommunityByIdRequestModel): MethodGetCommunityByIdResponseModel {
        if (!Meteor.userId()) return noAuthError()

        check(communityId, String)

        const community = CommunityCollection.findOne({_id: communityId})
        return {community: community as Community}
    }
})

Meteor.methods({
    [CommunityMethods.GET_COMMUNITY_LIST]: async function () {
        if (!Meteor.userId()) return noAuthError()

        try {
            const result = await CommunityCollection.rawCollection()
                .aggregate([
                    {
                        $lookup: {
                            from: "users",
                            localField: "_id",
                            foreignField: "profile.communityId",
                            as: "clubs"
                        }
                    },
                    {$sort: {createdAt: -1}}
                ])
                .toArray();

            return result.map<MethodGetCommunityListResponseModel>(community => ({
                communityId: community._id as string,
                title: community.name,
                createdAt: community.createdAt,
                clubs: community.clubs.length,
            }))
        } catch (error) {
            if (error instanceof Meteor.Error) {
                throw new Meteor.Error(error.message)
            }
            console.error(error)
        }
    }
})