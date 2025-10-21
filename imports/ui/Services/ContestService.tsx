import {create} from "zustand";
import {MethodSetContestCreateRequestModel} from "/imports/api/Сontest/models";
import {Meteor} from "meteor/meteor";
import {ContestMethods} from "/imports/api/names";

interface IContestService {
    setContests(data: MethodSetContestCreateRequestModel): Promise<void>;
}

export const ContestService = create<IContestService>(() => {
    return {
        setContests(data) {
            return new Promise((resolve, reject) => {
                Meteor.call(ContestMethods.SET_CONTEST_CREATE, data, (err: any) => {
                    if (err) return reject(err);
                    resolve();
                })
            })
        }
    }
})