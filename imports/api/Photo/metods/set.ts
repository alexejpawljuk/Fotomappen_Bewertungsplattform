import { Meteor } from "meteor/meteor";
import {PhotoMethods} from "/imports/api/names";
import {MethodSetPhotoByPhotoAlbumIDRequestModel} from "/imports/api/Photo/models";
import {check} from "meteor/check";
import {clientContentError} from "/imports/utils/serverErrors";
import {PhotoError} from "/imports/utils/constans/text";
import {MethodGetPhotoAlbumByIDRequestModel} from "/imports/api/PhotoAlbum/models";


Meteor.methods({
    [PhotoMethods.SET_PHOTO_BY_ALBUM_ID]: async function ({photoAlbumId, title, base64, photographer}: MethodSetPhotoByPhotoAlbumIDRequestModel) {
        check(title, String)
        check(base64, String)
        check(photoAlbumId, String)
        check(photographer.firstname, String)
        check(photographer.lastname, String)

        const cleanTitle = title.trim()
        const cleanPhotographerFirstname = photographer.firstname.trim()
        const cleanPhotographerLastname = photographer.lastname.trim()

        if (!cleanTitle) {

        }

        if (cleanTitle.length < 4) {

        }

        if (!cleanPhotographerFirstname) {

        }

        if (cleanPhotographerFirstname.length < 4) {

        }

        if (!cleanPhotographerLastname) {

        }

        if (cleanPhotographerLastname.length < 4) {

        }

        const photoAlbumRequest: MethodGetPhotoAlbumByIDRequestModel = {
            albumId: photoAlbumId
        }
        const existing = Meteor.call(PhotoMethods.GET_PHOTOS_BY_PHOT_ALBUM_ID, photoAlbumRequest)
        if (existing) {
            return clientContentError(PhotoError.PHOTO_TITLE_TAKEN)
        }


    }
})