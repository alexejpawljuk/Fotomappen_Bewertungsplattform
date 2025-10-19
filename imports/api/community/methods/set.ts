import {Meteor} from "meteor/meteor";
import {CommunityMethods} from "/imports/api/names";
import {Community, MethodSetCommunityRequestModel} from "/imports/api/community/models";
import {CommunityCollection} from "/imports/api/community/communityCollection";

Meteor.methods({
    [CommunityMethods.SET_COMMUNITY_CREATE]: function(data: MethodSetCommunityRequestModel){
        const community: Community = {
            name: data.title,
            createdAt: new Date()
        }
        CommunityCollection.insert(community)
    }
})