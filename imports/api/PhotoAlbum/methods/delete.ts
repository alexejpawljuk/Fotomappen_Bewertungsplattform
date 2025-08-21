import {Meteor} from "meteor/meteor"
import {PhotoAlbumMethods} from "/imports/api/names";
import {PhotoAlbumCollection} from "/imports/api/PhotoAlbum/photoAlbumCollection";
import {noAuthError} from "/imports/utils/serverErrors";

Meteor.methods({
    [PhotoAlbumMethods.DELETE_PHOTO_ALBUM_BY_ID]: async function (albumId: string) {
        if (!this.userId) return noAuthError()

        console.log("delete: ", albumId)
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