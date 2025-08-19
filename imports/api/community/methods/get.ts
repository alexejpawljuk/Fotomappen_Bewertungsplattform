import {Meteor} from "meteor/meteor";
import {CommunityCollectionCollection} from "/imports/api/community/communityCollection";
import {Community} from "/imports/api/community/models";
import {CommunityMethods} from "/imports/api/names";

Meteor.methods({
    [CommunityMethods.GET_COMMUNITY_ALL]: (): Community[] => {
        return CommunityCollectionCollection.find().fetch()
    }
})