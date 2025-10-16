import {Meteor} from "meteor/meteor"
import {PhotoAlbumMethods} from "/imports/api/names";
import {PhotoAlbumCollection} from "/imports/api/PhotoAlbum/photoAlbumCollection";
import {noAuthError} from "/imports/utils/serverErrors";
import {MethodDeletePhotoAlbumByIdRequestModel} from "/imports/api/PhotoAlbum/models";
import {PhotoCollection} from "/imports/api/Photo/photoCollection";
import {check} from "meteor/check"

Meteor.methods({
    [PhotoAlbumMethods.DELETE_PHOTO_ALBUM_BY_ID]: function ({ albumId }: MethodDeletePhotoAlbumByIdRequestModel): boolean {
        if (!this.userId) return noAuthError()
        check(albumId, String)

        const removed = PhotoAlbumCollection.remove({
            _id: albumId,
            "owner.userId": this.userId,
        })

        if (removed === 0) {
            throw new Meteor.Error("not-found", "Album not found or not yours");
        }

        PhotoCollection.remove({photoAlbumId: albumId})

        return true;
    }
})