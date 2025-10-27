import {Meteor} from "meteor/meteor";
import {ContestMethods} from "/imports/api/names";
import {MethodUpdateContestRequestModel} from "/imports/api/Сontest/models";
import {noAuthError} from "/imports/utils/serverErrors";
import {check} from "meteor/check";
import {ContestCollection} from "/imports/api/Сontest/contestCollection";

Meteor.methods({
    [ContestMethods.UPDATE_CONTEST_TITLE_BY_ID]: async function({contestId, title}: MethodUpdateContestRequestModel) {
        if (!this.userId) return noAuthError()

        check(title, String)
        check(contestId, String)

        try {
            const selector = {_id: contestId}
            const res = await ContestCollection.updateAsync(
                selector,
                {$set: { title: title}}
            )

            if (res === 0) {
                throw new Meteor.Error('not-found', 'Album not found');
            }
            return true;
        } catch (error) {
            if (error instanceof Meteor.Error) throw new Meteor.Error(error)
            console.log(error)
        }
    }
})