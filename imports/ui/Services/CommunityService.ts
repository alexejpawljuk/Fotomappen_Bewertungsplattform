import {create} from "zustand";
import {
    Community,
    MethodGetCommunitiesAllResponseModel,
    MethodSetCommunityRequestModel
} from "/imports/api/community/models";
import {Meteor} from "meteor/meteor";
import {CommunityMethods} from "/imports/api/names";

interface ICommunity {
    loading: boolean;
    getCommunity(): Promise<Community[]>;
    setCommunity(data: MethodSetCommunityRequestModel): Promise<void>;
}

export const CommunityService = create<ICommunity>(() => {
    return {
        loading: false,
        getCommunity() {
            return new Promise((resolve, reject) => {
                Meteor.call(CommunityMethods.GET_COMMUNITY_ALL, (err: any, {communities}: MethodGetCommunitiesAllResponseModel) => {
                    if (err) reject(err)
                    resolve(communities)
                })
            })
        },
        setCommunity(data: MethodSetCommunityRequestModel) {
            return new Promise((resolve, reject) => {
                Meteor.call(CommunityMethods.SET_COMMUNITY_CREATE, data, (err: any) => {
                    if (err) reject(err)
                    resolve()
                })
            })
        }
    }
})