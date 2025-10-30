import {Mongo} from 'meteor/mongo';
import {AvailableCollectionNames} from "/imports/api/names";
import {Community} from "./models";

export const CommunityCollection = new Mongo.Collection<Community>(AvailableCollectionNames.COMMUNITY);
