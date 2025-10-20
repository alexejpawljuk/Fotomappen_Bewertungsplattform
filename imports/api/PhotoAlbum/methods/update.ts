import {Meteor} from 'meteor/meteor';
import {PhotoAlbumMethods} from "/imports/api/names";
import {MethodUpdatePhotoAlbumRequestModel} from "/imports/api/PhotoAlbum/models";
import {noAuthError} from "/imports/utils/serverErrors";
import {PhotoAlbumCollection} from "/imports/api/PhotoAlbum/photoAlbumCollection";
import {check} from 'meteor/check';

Meteor.methods({
    [PhotoAlbumMethods.UPDATE_PHOTO_ALBUM_BY_ID]: async function({title, albumId}: MethodUpdatePhotoAlbumRequestModel){
        if (!this.userId) return noAuthError()

        check(title, String)
        check(albumId, String)

        try {
            const selector = {_id: albumId}
            const res = await PhotoAlbumCollection.updateAsync(
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