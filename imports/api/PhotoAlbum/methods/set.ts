import {Meteor} from 'meteor/meteor';
import {PhotoAlbumMethods} from "/imports/api/names";
import {MethodSetPhotoAlbumCreateModel, PhotoAlbum} from "/imports/api/PhotoAlbum/models";
import {check} from "meteor/check";
import {stringContainsOnlyLettersAndNumbers} from "/imports/utils/check";
import {PhotoAlbumError} from "/imports/utils/constans/text";
import {clientContentError, noAuthError} from "/imports/utils/serverErrors";
import {PhotoAlbumCollection} from "/imports/api/PhotoAlbum/photoAlbumCollection";


Meteor.methods({
    [PhotoAlbumMethods.SET_PHOTO_ALBUM_CREATE]: async ({
        title
    }: MethodSetPhotoAlbumCreateModel) => {
        check(title, String)

        const userId = Meteor.userId();
        if (!userId) {
            return noAuthError();
        }

        const cleanTitle = title.trim()

        if (!stringContainsOnlyLettersAndNumbers(cleanTitle)) {
            return clientContentError(PhotoAlbumError.PHOTO_ALBUM_TITLE_INVALID)
        }

        if (cleanTitle.length < 3) {
            return clientContentError(PhotoAlbumError.PHOTO_ALBUM_TITLE_TO_SHORT);
        }

        if (cleanTitle.length > 16) {
            return clientContentError(PhotoAlbumError.PHOTO_ALBUM_TITLE_TO_LONG)
        }

        const data: PhotoAlbum = {
            title,
            userId,
            createdAt: new Date()
        }

        const existing = PhotoAlbumCollection.findOne({ title: cleanTitle });
        if (existing) {
            return clientContentError(PhotoAlbumError.PHOTO_ALBUM_TITLE_TAKEN)
        }

        try {
            PhotoAlbumCollection.insert(data)
        } catch (e: unknown) {
            if (e instanceof Meteor.Error) {
                return clientContentError(e.details || e.reason || e.message)
            }
            return clientContentError((e as Error).message || JSON.stringify(e))
        }
    }
})