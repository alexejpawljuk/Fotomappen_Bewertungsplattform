import {Meteor} from "meteor/meteor"
import {AvailableCollectionNames, PhotoAlbumMethods} from "/imports/api/names"
import {PhotoAlbumCollection} from "/imports/api/PhotoAlbum/photoAlbumCollection"
import {
    MethodGetPhotoAlbumByIDRequestModel, MethodGetPhotoAlbumByIDResponseModel,
    MethodGetPhotoAlbumListResponseModel
} from "/imports/api/PhotoAlbum/models"
import {noAuthError} from "/imports/utils/serverErrors"


Meteor.methods({
    [PhotoAlbumMethods.GET_PHOTO_ALBUM_LIST]: async function () {
        if (!this.userId) {
            return noAuthError()
        }

        try {
            const result = await PhotoAlbumCollection.rawCollection().aggregate([
                {
                    $match: {
                        "owner.userId": this.userId,
                    }
                },
                {
                    $lookup: {
                        from: AvailableCollectionNames.PHOTO,
                        localField: "_id",
                        foreignField: "photoAlbumId",
                        as: AvailableCollectionNames.PHOTO,
                    }
                },
                {
                    $lookup: {
                        from: AvailableCollectionNames.CONTEST,
                        localField: "contest.contestId",
                        foreignField: "_id",
                        as: AvailableCollectionNames.CONTEST,
                    }
                },
                { $sort: { createdAt: -1 } },
            ]).toArray()

            return result.map<MethodGetPhotoAlbumListResponseModel>(({_id, owner, title, createdAt, photos, contest}) => ({
                albumId: _id,
                ownerId: owner.userId,
                title: title,
                createdAt: createdAt,
                numberOfPhotos: photos?.length ?? 0,
                rating: undefined,
                contest: {
                    contestId: contest[0]?.contestId ?? undefined,
                    status: "Inactive"
                }
            }))
        } catch (error) {
            if (error instanceof Meteor.Error) {
                throw new Meteor.Error(error.message)
            }
            console.error(error)
        }

    }
})

Meteor.methods({
    [PhotoAlbumMethods.GET_PHOTO_ALBUM_BY_ID]: async function ({albumId}: MethodGetPhotoAlbumByIDRequestModel) {
        if (!this.userId) {
            return noAuthError()
        }

        try {
            const photoAlbum = await PhotoAlbumCollection.findOneAsync({_id: albumId})
            const result: MethodGetPhotoAlbumByIDResponseModel = {photoAlbum}
            return result
        } catch (e) {
            if (e instanceof Meteor.Error) {
                return new Meteor.Error(e.error)
            }
        }
    }
})