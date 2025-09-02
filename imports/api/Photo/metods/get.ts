import {Meteor} from "meteor/meteor";
import {PhotoMethods} from "/imports/api/names";
import {PhotoCollection} from "/imports/api/Photo/photoCollection";
import {
    MethodGetPhotosListByAlbumIdRequestModel,
    MethodGetPhotosListByAlbumIdResponseModel
} from "/imports/api/Photo/models";


Meteor.methods({
    [PhotoMethods.GET_PHOTOS_LIST_BY_ALBUM_ID]: async function ({albumId}: MethodGetPhotosListByAlbumIdRequestModel) {
        const photosResult = PhotoCollection.find({
            photoAlbumId: albumId
        }).fetch()

        return photosResult.map<MethodGetPhotosListByAlbumIdResponseModel>((photo) => ({
            photoId: photo._id,
            title: photo.title,
            photoAlbumId: photo.photoAlbumId,
            base64: photo.base64,
            createdAt: photo.createdAt,
            photographer: photo.photographer,
        }))
    }
})

