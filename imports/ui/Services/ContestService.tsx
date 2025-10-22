import {create} from "zustand";
import {
    MethodGetContestsListPagedRequestModel, MethodGetContestsListPagedResponseModel, MethodGetContestsListResponseModel,
    MethodSetContestCreateRequestModel
} from "/imports/api/Сontest/models";
import {Meteor} from "meteor/meteor";
import {ContestMethods} from "/imports/api/names";

interface IContestService {
    setContests(data: MethodSetContestCreateRequestModel): Promise<void>;
    updateContest(data: any): Promise<void>;
    deleteContest(data: any): Promise<void>;
    contestsList: MethodGetContestsListResponseModel[];
    loading: boolean;
    getContestsListFetch(): Promise<void>;
    contestsListPaged: MethodGetContestsListResponseModel[];
    getContestsListPagedFetch(data: MethodGetContestsListPagedRequestModel): Promise<MethodGetContestsListPagedResponseModel>;
}

export const ContestService = create<IContestService>((setState) => {
    return {
        contestsList: [],
        loading: false,
        contestsListPaged: [],
        setContests(data) {
            return new Promise((resolve, reject) => {
                Meteor.call(ContestMethods.SET_CONTEST_CREATE, data, (err: any) => {
                    if (err) return reject(err);
                    resolve();
                })
            })
        },
        updateContest(data) {
            return new Promise((resolve, reject) => {
                Meteor.call("", data, (err: any) => {
                    if (err) return reject(err);
                    resolve();
                })
            })
        },
        deleteContest(data) {
            return new Promise((resolve, reject) => {
                Meteor.call("", data, (err: any) => {
                    if (err) return reject(err);
                    resolve();
                })
            })
        },
        getContestsListFetch() {
            return new Promise((resolve, reject) => {
                setState(state => ({...state, loading: true}));
                Meteor.call(ContestMethods.GET_CONTEST_LIST, (err: any, res: MethodGetContestsListResponseModel[]) => {
                    if (err) {
                        setState(state => ({...state, loading: false}));
                        return reject(err);
                    }

                    const contestsList = res.map<MethodGetContestsListResponseModel>(contest => ({
                        contestId: contest.contestId,
                        title: contest.title,
                        submissionPhase: {
                            start: contest?.submissionPhase?.start,
                            end: contest?.submissionPhase?.end
                        },
                        contestPhase: {
                            start: contest?.contestPhase?.start,
                            end: contest?.contestPhase?.end
                        },
                        photo_albums: contest?.photo_albums,
                        result: contest?.result
                    }))
                    setState(state => ({...state, contestsList, loading: false}))
                    resolve();
                })
            })
        },
        getContestsListPagedFetch(data: MethodGetContestsListPagedRequestModel) {
            return new Promise((resolve, reject) => {
                Meteor.call(ContestMethods.GET_CONTEST_LIST_PAGED, data, (err: any, res: MethodGetContestsListPagedResponseModel) => {
                    if (err) return reject(err)
                    resolve(res)
                })
            })
        }
    }
})