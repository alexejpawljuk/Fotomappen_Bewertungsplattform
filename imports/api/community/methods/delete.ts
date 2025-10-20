import {Meteor} from "meteor/meteor";
import {CommunityMethods} from "/imports/api/names";
import {MethodDeleteCommunityByIdRequestModel} from "/imports/api/community/models";
import {noAuthError} from "/imports/utils/serverErrors";
import {check} from "meteor/check";
import {CommunityCollection} from "/imports/api/community/communityCollection";

Meteor.methods({
    [CommunityMethods.DELETE_COMMUNITY_BY_ID]: async function({communityId}: MethodDeleteCommunityByIdRequestModel) {
        if (!this.userId) return noAuthError()

        check(communityId, String)

        try {
            const community = await CommunityCollection.findOneAsync({_id: communityId})
            if (!community) {
                throw new Meteor.Error('community-not-found');
            }

            const res = await CommunityCollection.removeAsync({_id: communityId})
            if (!res) throw new Meteor.Error('community-not-found');

            return true
        } catch (err) {
            if (err instanceof Meteor.Error) throw new Meteor.Error(err.message);
            console.log(err)
        }
    }
})