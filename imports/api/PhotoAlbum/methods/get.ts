import {Meteor} from "meteor/meteor"
import {AvailableCollectionNames, PhotoAlbumMethods} from "/imports/api/names";
import {PhotoAlbumCollection} from "/imports/api/PhotoAlbum/photoAlbumCollection";
import {MethodGetPhotoAlbumListModel} from "/imports/api/PhotoAlbum/models";
import {noAuthError} from "/imports/utils/serverErrors";

Meteor.methods({
    [PhotoAlbumMethods.GET_PHOTO_ALBUM_LIST]: async function (): Promise<MethodGetPhotoAlbumListModel[]> {
        if (!this.userId) {
            return noAuthError();
        }

        const result = await PhotoAlbumCollection.rawCollection().aggregate([
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

        return result.map<MethodGetPhotoAlbumListModel>(({_id, owner, title, createdAt, photos, contest}) => ({
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

    }
})