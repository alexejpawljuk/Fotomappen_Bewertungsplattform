import {Meteor} from "meteor/meteor";
import {CommunityCollection} from "/imports/api/community/communityCollection";
import {CommunityMethods} from "/imports/api/names";
import {
    Community,
    MethodGetCommunitiesAllResponseModel,
    MethodGetCommunityByIdRequestModel,
    MethodGetCommunityByIdResponseModel
} from "/imports/api/community/models";

Meteor.methods({
    [CommunityMethods.GET_COMMUNITY_ALL]: function(): MethodGetCommunitiesAllResponseModel {
        const communities = CommunityCollection.find().fetch()
        return {communities}
    }
})

Meteor.methods({
    [CommunityMethods.GET_COMMUNITY_BY_ID]: function(data: MethodGetCommunityByIdRequestModel): MethodGetCommunityByIdResponseModel {
        const community = CommunityCollection.findOne({_id: data.communityId})
        return {community: community as Community}
    }
})