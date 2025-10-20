import {Meteor} from "meteor/meteor";
import {CommunityMethods} from "/imports/api/names";
import {Community, MethodSetCommunityRequestModel} from "/imports/api/community/models";
import {CommunityCollection} from "/imports/api/community/communityCollection";
import {clientContentError, noAuthError} from "/imports/utils/serverErrors";
import {check} from "meteor/check";
import {stringContainsOnlyLettersAndNumbers} from "/imports/utils/check";
import {CommunityError} from "/imports/utils/constans/text";

Meteor.methods({
    [CommunityMethods.SET_COMMUNITY_CREATE]: function({title}: MethodSetCommunityRequestModel){
        if (!Meteor.userId()) return noAuthError()

        check(title, String)

        const cleanTitle = title.trim()

        if (!stringContainsOnlyLettersAndNumbers(cleanTitle)) {
            return clientContentError(CommunityError.COMMUNITY_TITLE_INVALID)
        }

        if (cleanTitle.length < 3) {
            return clientContentError(CommunityError.COMMUNITY_TITLE_TO_SHORT);
        }

        if (cleanTitle.length > 16) {
            return clientContentError(CommunityError.COMMUNITY_TITLE_TO_LONG)
        }

        const existing = CommunityCollection.findOne({name: cleanTitle});
        if (existing) {
            return clientContentError(CommunityError.COMMUNITY_TITLE_TAKEN)
        }

        const community: Community = {
            name: title,
            createdAt: new Date()
        }
        CommunityCollection.insert(community)
    }
})