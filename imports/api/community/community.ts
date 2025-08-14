import {Mongo} from 'meteor/mongo';
import {AvailableCollectionNames} from "/imports/api/names";
import {Community} from "/imports/api/community/models";

export const CommunityCollection = new Mongo.Collection<Community>(AvailableCollectionNames.COMMUNITY);

// Populate the collection with some data
// if (CommunityCollection.find().count() === 0) {
//     CommunityCollection.insert({
//         name: 'Community 1',
//         createdAt: new Date()
//     });
//     CommunityCollection.insert({
//         name: 'Community 2',
//         createdAt: new Date()
//     });
//     CommunityCollection.insert({
//         name: 'Community 3',
//         createdAt: new Date()
//     })
// }
