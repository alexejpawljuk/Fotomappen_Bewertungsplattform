import {Mongo} from "meteor/mongo";
import {Photo} from "/imports/api/Photo/models";
import {AvailableCollectionNames} from "/imports/api/names";

export const PhotoCollection = new Mongo.Collection<Photo>(AvailableCollectionNames.PHOTO);