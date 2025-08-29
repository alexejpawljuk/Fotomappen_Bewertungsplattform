import {Meteor} from "meteor/meteor";
import {PhotoMethods} from "/imports/api/names";
import {MethodSetPhotoByPhotoAlbumIDRequestModel, Photo} from "/imports/api/Photo/models";
import {check} from "meteor/check";
import {clientContentError, internalServerError, noAuthError} from "/imports/utils/serverErrors";
import {PhotoAlbumError, PhotoError} from "/imports/utils/constans/text";
import {PhotoCollection} from "/imports/api/Photo/photoCollection";
import {PhotoAlbumCollection} from "/imports/api/PhotoAlbum/photoAlbumCollection";


Meteor.methods({
    [PhotoMethods.SET_PHOTO_BY_ALBUM_ID]: async function ({
                                                              photoAlbumId,
                                                              title,
                                                              base64,
                                                              photographer
                                                          }: MethodSetPhotoByPhotoAlbumIDRequestModel) {
        const userId = Meteor.userId();
        if (!userId) {
            return noAuthError()
        }

        check(title, String)
        check(base64, String)
        check(photoAlbumId, String)
        check(photographer.firstname, String)
        check(photographer.lastname, String)

        const cleanTitle = title.trim()
        const cleanPhotographerFirstname = photographer.firstname.trim()
        const cleanPhotographerLastname = photographer.lastname.trim()

        if (!cleanTitle) {
            return clientContentError(PhotoError.PHOTO_TITLE_EMPTY)
        }

        if (cleanTitle.length < 4) {
            return clientContentError(PhotoError.PHOTO_TITLE_TO_SHORT)
        }

        if (!cleanPhotographerFirstname) {
            return clientContentError(PhotoError.PHOTOGRAPHER_FIRSTNAME_EMPTY)
        }

        if (cleanPhotographerFirstname.length < 4) {
            return clientContentError(PhotoError.PHOTOGRAPHER_FIRSTNAME_TOO_SHORT)
        }

        if (!cleanPhotographerLastname) {
            return clientContentError(PhotoError.PHOTOGRAPHER_LASTNAME_EMPTY)
        }

        if (cleanPhotographerLastname.length < 4) {
            return clientContentError(PhotoError.PHOTOGRAPHER_LASTNAME_TOO_SHORT)
        }

        const existing = await PhotoCollection.findOneAsync({
            title: cleanTitle
        })
        if (existing) {
            return clientContentError(PhotoError.PHOTO_TITLE_TAKEN)
        }

        const owner = await PhotoAlbumCollection.findOneAsync({
            _id: photoAlbumId,
            owner: {
                userId: this.userId
            }
        })
        if (!owner) {
            return noAuthError(PhotoAlbumError.PHOTO_ALBUM_ACCESS)
        }

        const photoData: Photo = {title, base64, photoAlbumId, photographer, createdAt: new Date()}

        PhotoCollection.insert(photoData, (err: any) => {
            if (err) return internalServerError(err)
        })
    }
})