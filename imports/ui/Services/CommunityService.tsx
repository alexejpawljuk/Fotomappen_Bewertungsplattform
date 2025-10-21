import {create} from "zustand";
import {
    Community, MethodDeleteCommunityByIdRequestModel,
    MethodGetCommunitiesAllResponseModel, MethodGetCommunityByIdRequestModel, MethodGetCommunityByIdResponseModel,
    MethodGetCommunityListResponseModel,
    MethodSetCommunityRequestModel, MethodUpdateCommunityByIdRequestModel
} from "/imports/api/Community/models";
import {Meteor} from "meteor/meteor";
import {CommunityMethods} from "/imports/api/names";



interface ICommunity {
    getCommunities(): Promise<Community[]>;
    getCommunityById(data: MethodGetCommunityByIdRequestModel): Promise<MethodGetCommunityByIdResponseModel>;
    setCommunity(data: MethodSetCommunityRequestModel): Promise<void>;
    loading: boolean;
    communitiesList: MethodGetCommunityListResponseModel[];
    communitiesListFetch(): Promise<void>;
    updateCommunityById(data: MethodUpdateCommunityByIdRequestModel): Promise<void>;
    deleteCommunityById(data: MethodDeleteCommunityByIdRequestModel): Promise<void>;
}

export const CommunityService = create<ICommunity>((setState) => {
    return {
        getCommunities() {
            return new Promise((resolve, reject) => {
                Meteor.call(CommunityMethods.GET_COMMUNITY_ALL, (err: any, {communities}: MethodGetCommunitiesAllResponseModel) => {
                    if (err) reject(err)
                    resolve(communities)
                })
            })
        },
        getCommunityById(data) {
            return new Promise((resolve, reject) => {
                Meteor.call(CommunityMethods.GET_COMMUNITY_BY_ID, data, (err: any, res: MethodGetCommunityByIdResponseModel)=> {
                    if (err) reject(err)
                    resolve(res)
                })
            })
        },
        setCommunity(data) {
            return new Promise((resolve, reject) => {
                Meteor.call(CommunityMethods.SET_COMMUNITY_CREATE, data, (err: any) => {
                    if (err) reject(err)
                    resolve()
                })
            })
        },
        communitiesList: [],
        loading: false,
        communitiesListFetch() {
            return new Promise((resolve, reject) => {
                setState(state => ({...state, loading: true}))
                Meteor.call(CommunityMethods.GET_COMMUNITY_LIST, (err: any, res: MethodGetCommunityListResponseModel[]) => {
                    if (err) {
                        setState(state => ({...state, loading: false}))
                        return reject(err)
                    }
                    setState(state => ({...state, communitiesList: res, loading: false}))
                    resolve()
                })
            })
        },
        updateCommunityById(data): Promise<void> {
            return new Promise((resolve, reject) => {
                Meteor.call(CommunityMethods.UPDATE_COMMUNITY_BY_ID, data, (err: any) => {
                    if (err) reject(err)
                    resolve()
                })
            })
        },
        deleteCommunityById(data) {
            return new Promise((resolve, rejects) => {
                Meteor.call(CommunityMethods.DELETE_COMMUNITY_BY_ID, data, (err: any) => {
                    if (err) return rejects(err)
                    resolve()
                })
            })
        },
    }
})