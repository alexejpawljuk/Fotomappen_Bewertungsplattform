import {Meteor} from 'meteor/meteor';
import {PhotoAlbumMethods} from "/imports/api/names";
import {MethodUpdatePhotoAlbumRequestModel} from "/imports/api/PhotoAlbum/models";
import {noAuthError} from "/imports/utils/serverErrors";
import {PhotoAlbumCollection} from "/imports/api/PhotoAlbum/photoAlbumCollection";
import {check} from 'meteor/check';

Meteor.methods({
    [PhotoAlbumMethods.UPDATE_PHOTO_ALBUM_BY_ID]: async function(data: MethodUpdatePhotoAlbumRequestModel){
        if (!this.userId) return noAuthError()

        check(data.title, String)
        check(data.albumId, String)

        try {
            const selector = {_id: data.albumId}
            const res = await PhotoAlbumCollection.updateAsync(
                selector,
                {$set: { title: data.title}}
            )

            if (res === 0) {
                throw new Meteor.Error('not-found', 'Album not found');
            }
        } catch (error) {
            if (error instanceof Meteor.Error) throw new Meteor.Error(error)
            console.log(error)
        }

        return true;
    }
})