import {Meteor} from "meteor/meteor";
import {PhotoPublication} from "/imports/api/names";
import {noAuthError} from "/imports/utils/serverErrors";
import {PhotoAlbumCollection} from "/imports/api/PhotoAlbum/photoAlbumCollection";
import {PhotoCollection} from "/imports/api/Photo/photoCollection";

Meteor.publish(PhotoPublication.LIST, function () {

    console.log("From PhotoPublication");

    if (!this.userId) {
        return noAuthError()
    }
    const photoAlbum = PhotoAlbumCollection.findOne(
        {"owner.userId": this.userId},
        {fields: {_id: 1,}}
    );

    if (!photoAlbum) {
        return noAuthError();
    }

    const collection = PhotoCollection.find({photoAlbumId: photoAlbum._id})
    console.log(collection.fetch())

    return collection
});