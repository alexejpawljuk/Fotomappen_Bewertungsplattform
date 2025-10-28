import {create} from "zustand";
import {
    MethodGetContestByIdRequestModel,
    MethodGetContestByIdResponseModel,
    MethodGetContestsListPagedRequestModel,
    MethodGetContestsListPagedResponseModel,
    MethodGetContestsListResponseModel,
    MethodSetContestCreateRequestModel,
    MethodSetPhotoAlbumToContestRequestModel,
    MethodUpdateContestRequestModel
} from "/imports/api/Contest/models";
import {Meteor} from "meteor/meteor";
import {ContestMethods} from "/imports/api/names";

interface IContestService {
    setContests(data: MethodSetContestCreateRequestModel): Promise<void>;
    setPhotoAlbumToContest(data: MethodSetPhotoAlbumToContestRequestModel): Promise<void>;
    updateContest(data: MethodUpdateContestRequestModel): Promise<void>;
    deleteContest(data: any): Promise<void>;
    loading: boolean;
    contestsListPaged: MethodGetContestsListResponseModel[];
    getContestsListPagedFetch(data?: MethodGetContestsListPagedRequestModel): Promise<MethodGetContestsListPagedResponseModel>;
    getContestById(data: MethodGetContestByIdRequestModel): Promise<MethodGetContestByIdResponseModel>;
}

export const ContestService = create<IContestService>((setState) => {
    return {
        // contestsList: [],
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
        setPhotoAlbumToContest(data) {
            return new Promise((resolve, reject) => {
                Meteor.call(ContestMethods.SET_PHOTO_ALBUM_TO_CONTEST, data, (err: any) => {
                    if (err) return reject(err);
                    resolve();
                })
            })
        },
        updateContest(data) {
            return new Promise((resolve, reject) => {
                Meteor.call(ContestMethods.UPDATE_CONTEST_TITLE_BY_ID, data, (err: any) => {
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
        getContestsListPagedFetch(data = {page: 1, pageSize: 10, search: ""}) {
            return new Promise((resolve, reject) => {
                setState(state => ({...state, loading: true}));
                Meteor.call(ContestMethods.GET_CONTEST_LIST_PAGED, data, (err: any, res: MethodGetContestsListPagedResponseModel) => {
                    if (err) {
                        setState(state => ({...state, loading: false}));
                        return reject(err)
                    }
                    setState(state => ({...state, contestsListPaged: res.items, loading: false}));
                    resolve(res)
                })
            })
        },
        getContestById(data) {
            return new Promise((resolve, reject) => {
                Meteor.call(ContestMethods.GET_CONTEST_BY_ID, data, (err: any, res: MethodGetContestByIdResponseModel) => {
                    if (err) return reject(err);
                    resolve({contest: res.contest, photoAlbums: res.photoAlbums});
                })
            })
        }
    }
})