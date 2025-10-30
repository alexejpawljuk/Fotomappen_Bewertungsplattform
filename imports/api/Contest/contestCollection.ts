import {Mongo} from "meteor/mongo";
import {AvailableCollectionNames} from "/imports/api/names";
import {Contest} from "/imports/api/Contest/models";


export const ContestCollection = new Mongo.Collection<Contest>(AvailableCollectionNames.CONTEST);
