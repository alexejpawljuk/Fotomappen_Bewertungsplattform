import {Meteor} from "meteor/meteor";
import {CommunityCollection} from "/imports/api/community/communityCollection";
import {CommunityMethods} from "/imports/api/names";
import {MethodGetCommunitiesAllResponseModel} from "/imports/api/community/models";

Meteor.methods({
    [CommunityMethods.GET_COMMUNITY_ALL]: function(): MethodGetCommunitiesAllResponseModel {
        const communities = CommunityCollection.find().fetch()
        return {communities}
    }
})