import {Meteor} from "meteor/meteor";
import {ContestMethods} from "/imports/api/names";
import {Contest, MethodSetContestCreateRequestModel} from "/imports/api/Сontest/models";
import {clientContentError, noAuthError} from "/imports/utils/serverErrors";
import {check} from "meteor/check";
import {ContestCollection} from "/imports/api/Сontest/contestCollection";
import {ContestError} from "/imports/utils/constans/text";


Meteor.methods({
    [ContestMethods.SET_CONTEST_CREATE]: async function({title, submissionPhase, contestPhase}: MethodSetContestCreateRequestModel) {
        if (!this.userId) return noAuthError()

        check(title, String);
        check(submissionPhase.date.start, String);
        check(submissionPhase.date.end, String);
        check(contestPhase.date.start, String);
        check(contestPhase.date.end, String);

        const existing = await ContestCollection.findOneAsync({title: title})
        if(existing) clientContentError(ContestError.CONTEST_TITLE_TAKEN)


        const contest: Contest = {
            title,
            phases: {
                submissionPhase: {
                    start: submissionPhase.date.start,
                    end: submissionPhase.date.end
                },
                contestPhase: {
                    start: contestPhase.date.start,
                    end: contestPhase.date.end
                },
            },
            createdAt: new Date(),
            owner: {
                userId: this.userId
            }
        }

        try {
            const res = await ContestCollection.insertAsync(contest)
            if (!res) throw new Meteor.Error( "Server error: Contest collection failed.")
            return true
        } catch (err) {
            if (err instanceof Meteor.Error) throw new Meteor.Error(err.details || "Server error: Contest creation failed.")
            console.log("Server error: Contest creation failed.")
        }
    }
})