import {Meteor} from "meteor/meteor";
import {PhotoMethods} from "/imports/api/names";
import {noAuthError} from "/imports/utils/serverErrors";
import {PhotoCollection} from "/imports/api/Photo/photoCollection";
import {PhotoAlbumCollection} from "/imports/api/PhotoAlbum/photoAlbumCollection";
import {MethodDeletePhotoByIdRequestModel} from "/imports/api/Photo/models";
import {check} from "meteor/check";

Meteor.methods({
    [PhotoMethods.DELETE_PHOTO_BY_ID]: async function ({photoId} :MethodDeletePhotoByIdRequestModel) {
        if (!this.userId) return noAuthError()

        check(photoId, String)

        try {
            const photo = await PhotoCollection.findOneAsync({_id: photoId})
            if (!photo) {
                throw new Meteor.Error('photo-not-found');
            }

            const album = PhotoAlbumCollection.findOne({ _id: photo.photoAlbumId });
            if (!album) {
                throw new Meteor.Error('album-not-found');
            }

            if (album.owner?.userId !== this.userId) {
                throw new Meteor.Error('access-denied', 'You cannot delete someone else’s photo');
            }

            await PhotoCollection.removeAsync({_id: photoId})

            return {photo}
        } catch (err) {
            if (err instanceof Meteor.Error) throw new Meteor.Error(err.message);
            console.log(err)
        }
    }
})