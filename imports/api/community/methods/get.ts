import {Meteor} from "meteor/meteor";
import {CommunityCollection} from "/imports/api/community/community";
import {Community} from "/imports/api/community/models";

Meteor.methods({
    "get.communityAll": (): Community[] => {
        return CommunityCollection.find().fetch()
    }
})