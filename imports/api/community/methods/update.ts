import {Meteor} from "meteor/meteor";
import {CommunityMethods} from "/imports/api/names";
import {noAuthError} from "/imports/utils/serverErrors";
import {MethodUpdateCommunityByIdRequestModel} from "/imports/api/community/models";
import {check} from "meteor/check";
import {CommunityCollection} from "/imports/api/community/communityCollection";

Meteor.methods({
    [CommunityMethods.UPDATE_COMMUNITY_BY_ID]: async function({communityId, title}: MethodUpdateCommunityByIdRequestModel) {
        if (!this.userId) return noAuthError()

        check(communityId, String)
        check(title, String)

        try {
            const selector = {_id: communityId};
            const res = await CommunityCollection.updateAsync(
                selector,
                {
                    $set: {
                        name: title,
                    }
                }
            )

            if (res === 0) {
                throw new Meteor.Error('not-found', 'Photo not found');
            }
        } catch (error) {
            if (error instanceof Meteor.Error) throw new Meteor.Error(error.message);
            console.log(error)
        }

        return true;
    }
})