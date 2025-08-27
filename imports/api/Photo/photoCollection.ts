import {Mongo} from "meteor/mongo";
import {Photo} from "/imports/api/Photo/models";
import {AvailableCollectionNames} from "/imports/api/names";

export const PhotoCollection = new Mongo.Collection<Photo>(AvailableCollectionNames.PHOTO);

// Populate the collection with some data
if (PhotoCollection.find().count() === 0) {
    PhotoCollection.insert({
        photoAlbumId: "H8sTmrEnGaHfeqWwN",
        title: "",
        base64: "",
        createdAt: new Date(),
        photographer: {
            firstname: "John",
            lastname: "Doe"
        }
    })
    PhotoCollection.insert({
        photoAlbumId: "H8sTmrEnGaHfeqWwN",
        title: "",
        base64: "",
        createdAt: new Date(),
        photographer: {
            firstname: "John",
            lastname: "Doe"
        }
    })
}