import {Meteor} from "meteor/meteor";
import {PhotoMethods} from "/imports/api/names";
import {MethodUpdatePhotoRequestModel} from "/imports/api/Photo/models";
import {noAuthError} from "/imports/utils/serverErrors";
import {check} from "meteor/check";
import {PhotoCollection} from "/imports/api/Photo/photoCollection";

Meteor.methods({
    [PhotoMethods.UPDATE_PHOTO_BY_ID]: async function (photoData: MethodUpdatePhotoRequestModel) {
        if (!this.userId) return noAuthError()

        check(photoData.photoId, String)
        check(photoData.title, String)
        check(photoData.photographer.firstname, String)
        check(photoData.photographer.lastname, String)

        try {
            const selector = {_id: photoData.photoId};
            const res = await PhotoCollection.updateAsync(
                selector,
                {
                    $set: {
                        title: photoData.title,
                        photographer: photoData.photographer,
                    }
                }
            )

            if (res === 0) {
                throw new Meteor.Error('not-found', 'Photo not found');
            }
        } catch (error) {
            if (error instanceof Meteor.Error) throw new Meteor.Error(error)
            console.log(error)
        }

        return true;
    }
})