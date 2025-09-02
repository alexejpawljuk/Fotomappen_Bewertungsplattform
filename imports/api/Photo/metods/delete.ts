import {Meteor} from "meteor/meteor";
import {PhotoMethods} from "/imports/api/names";
import {noAuthError} from "/imports/utils/serverErrors";
import {PhotoCollection} from "/imports/api/Photo/photoCollection";
import {PhotoAlbumCollection} from "/imports/api/PhotoAlbum/photoAlbumCollection";
import {MethodDeletePhotoByIdRequestModel} from "/imports/api/Photo/models";

Meteor.methods({
    [PhotoMethods.DELETE_PHOTO_BY_ID]: async function ({photoId} :MethodDeletePhotoByIdRequestModel) {
        if (!this.userId) {
            noAuthError()
        }

        if (!photoId) {
            throw new Meteor.Error('invalid-photo-id', 'photoId is required');
        }

        const photo = await PhotoCollection.findOneAsync({_id: photoId})
        if (!photo) {
            throw new Meteor.Error('photo-not-found');
        }

        const album = await PhotoAlbumCollection.findOne({ _id: photo.photoAlbumId });
        if (!album) {
            throw new Meteor.Error('album-not-found');
        }

        if (album.owner?.userId !== this.userId) {
            throw new Meteor.Error('access-denied', 'You cannot delete someone else’s photo');
        }

        PhotoCollection.remove({_id: photoId})

        return {photo}
    }
})