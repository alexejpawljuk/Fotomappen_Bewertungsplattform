import {Mongo} from "meteor/mongo";
import {AvailableCollectionNames} from "/imports/api/names";
import {Contest} from "/imports/api/Contest/models";


export const ContestCollection = new Mongo.Collection<Contest>(AvailableCollectionNames.CONTEST);

if (ContestCollection.find().count() === 0) {
    console.log("No Contests found. Creating some")
    const contests: Contest[] = Array.from({ length: 3 }, (_, index) => ({

        createdAt: new Date(),
        owner: { userId: `${index}` },
        phases: {
            submissionPhase: {
                start: new Date().toDateString(),
                end: new Date().toDateString()
            },
            contestPhase: {
                start: new Date().toDateString(),
                end: new Date().toDateString()
            }
        },
        title: `TEST Contest ${index}`,
    }));

    console.log(contests[0]);

    contests.forEach(contest => ContestCollection.insert(contest))
}

