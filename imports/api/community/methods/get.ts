import {Meteor} from "meteor/meteor";
import {CommunityCollection} from "/imports/api/community/community";

Meteor.methods({
    "get.communityAll": () => {
        return CommunityCollection.find().fetch()
    }
})