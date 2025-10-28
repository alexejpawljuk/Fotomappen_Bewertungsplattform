import {Meteor} from "meteor/meteor";
import {ContestMethods} from "/imports/api/names";
import {
    Contest,
    MethodSetContestCreateRequestModel,
    MethodSetPhotoAlbumToContestRequestModel
} from "/imports/api/Contest/models";
import {clientContentError, noAuthError} from "/imports/utils/serverErrors";
import {check} from "meteor/check";
import {ContestCollection} from "/imports/api/Contest/contestCollection";
import {ContestError} from "/imports/utils/constans/text";
import {PhotoAlbumCollection} from "/imports/api/PhotoAlbum/photoAlbumCollection";


Meteor.methods({
    [ContestMethods.SET_CONTEST_CREATE]: async function ({
                                                             title,
                                                             submissionPhase,
                                                             contestPhase
                                                         }: MethodSetContestCreateRequestModel) {
        if (!this.userId) return noAuthError()

        check(title, String);
        check(submissionPhase.date.start, String);
        check(submissionPhase.date.end, String);
        check(contestPhase.date.start, String);
        check(contestPhase.date.end, String);

        const existing = await ContestCollection.findOneAsync({title: title})
        if (existing) clientContentError(ContestError.CONTEST_TITLE_TAKEN)


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
            if (!res) throw new Meteor.Error("Server error: Contests collection failed.")
            return true
        } catch (err) {
            if (err instanceof Meteor.Error) throw new Meteor.Error(err.details || "Server error: Contests creation failed.")
            console.log("Server error: Contests creation failed.")
        }
    }
})

Meteor.methods({
    [ContestMethods.SET_PHOTO_ALBUM_TO_CONTEST]: async function ({
                                                                     contestId,
                                                                     photoAlbumId
                                                                 }: MethodSetPhotoAlbumToContestRequestModel) {
        if (!this.userId) return noAuthError()
        check(contestId, String)
        check(photoAlbumId, String)

        const photoAlbum = await PhotoAlbumCollection.findOneAsync({_id: photoAlbumId})
        if (!photoAlbum)
            throw new Meteor.Error("Server error: Photo album not exists")

        if (photoAlbum.contest.contestId)
            throw new Meteor.Error("Failed to insert photoAlbum to Contest. This photo album is already linked to another contest");

        try {
            const photoAlbum = await PhotoAlbumCollection.findOneAsync({_id: photoAlbumId})
            if (!photoAlbum)
                throw new Meteor.Error("Server error: Photo album not exists")

            if (photoAlbum.contest.contestId)
                throw new Meteor.Error("Failed to insert photoAlbum to Contest. This photo album is already linked to another contest");

            const selector = {_id: photoAlbumId}
            const res = await PhotoAlbumCollection.updateAsync(
                selector,
                {
                    $set: {
                        "contest.contestId": contestId
                    }
                }
            )

            if (res === 0) {
                throw new Meteor.Error('not-found', 'Album not found');
            }
            return true;
        } catch (error) {
            if (error instanceof Meteor.Error) throw new Meteor.Error(error.details ?? "Error: UPDATE_PHOTO_ALBUM_BY_ID");
            console.log(error)
        }
    }
})