import {Mongo} from "meteor/mongo";
import {AvailableCollectionNames} from "/imports/api/names";
import {Contest} from "/imports/api/Сontest/models";


export const ContestCollection = new Mongo.Collection<Contest>(AvailableCollectionNames.CONTEST);

if (ContestCollection.find().count() === 0) {
    console.log("No Contests found. Creating some")
    const contests: Contest[] = Array.from({ length: 3 }, (_, index) => ({
        createdAt: new Date(),
        owner: { userId: `${index}` },
        phases: {
            "1_phase": {
                startTime: new Date(),
                endTime: new Date()
            },
            "2_phase": {
                startTime: new Date(),
                endTime: new Date()
            }
        },
        title: `TEST Contest ${index}`,
    }));

    console.log(contests[0]);

    contests.forEach(contest => ContestCollection.insert(contest))
}

