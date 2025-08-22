import {Meteor} from "meteor/meteor"
import {PhotoAlbumMethods} from "/imports/api/names";
import {PhotoAlbumCollection} from "/imports/api/PhotoAlbum/photoAlbumCollection";
import {noAuthError} from "/imports/utils/serverErrors";
import {MethodDeletePhotoAlbumByIdModel} from "/imports/api/PhotoAlbum/models";


Meteor.methods({
    [PhotoAlbumMethods.DELETE_PHOTO_ALBUM_BY_ID]: function ({ albumId }: MethodDeletePhotoAlbumByIdModel): boolean {
        if (!this.userId) return noAuthError()

        const removed = PhotoAlbumCollection.remove({
            _id: albumId,
            "owner.userId": this.userId,
        })

        if (removed === 0) {
            throw new Meteor.Error("not-found", "Album not found or not yours");
        }

        return true;
    }
})