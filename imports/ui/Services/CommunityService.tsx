import {create} from "zustand";
import {
    Community,
    MethodGetCommunitiesAllResponseModel, MethodGetCommunityByIdRequestModel, MethodGetCommunityByIdResponseModel,
    MethodSetCommunityRequestModel
} from "/imports/api/community/models";
import {Meteor} from "meteor/meteor";
import {CommunityMethods} from "/imports/api/names";

interface ICommunity {
    loading: boolean;
    getCommunities(): Promise<Community[]>;
    getCommunityById(data: MethodGetCommunityByIdRequestModel): Promise<MethodGetCommunityByIdResponseModel>;
    setCommunity(data: MethodSetCommunityRequestModel): Promise<void>;
}

export const CommunityService = create<ICommunity>(() => {
    return {
        loading: false,
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
        }
    }
})