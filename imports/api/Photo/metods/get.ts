import {Meteor} from "meteor/meteor";
import {PhotoMethods} from "/imports/api/names";
import {PhotoCollection} from "/imports/api/Photo/photoCollection";
import {MethodGetPhotoByTitleRequestModel} from "/imports/api/Photo/models";

Meteor.methods({
    [PhotoMethods.GET_PHOTOS_BY_TITLE]: async function({title}: MethodGetPhotoByTitleRequestModel) {
        const raw = PhotoCollection.rawCollection();
        // передаём collation во 2-м аргументе
        const existing = await raw.findOne(
            { title },
            { collation: { locale: 'ru', strength: 2 } }
        );
        return existing;
    }
})