import {Meteor} from "meteor/meteor";
import {CommunityCollection} from "/imports/api/community/community";
import {Community} from "/imports/api/community/models";
import {CommunityMethods} from "/imports/api/names";

Meteor.methods({
    [CommunityMethods.GET_COMMUNITY_ALL]: (): Community[] => {
        return CommunityCollection.find().fetch()
    }
})