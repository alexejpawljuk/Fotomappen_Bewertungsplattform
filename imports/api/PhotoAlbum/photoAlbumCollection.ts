import {Mongo} from "meteor/mongo";
import {PhotoAlbum} from "./models";
import {AvailableCollectionNames} from "/imports/api/names";

export const PhotoAlbumCollection = new Mongo.Collection<PhotoAlbum>(AvailableCollectionNames.PHOTO_ALBUM);