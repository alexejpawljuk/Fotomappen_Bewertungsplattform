import {create} from "zustand";
import {Community, MethodGetCommunitiesAllResponseModel} from "/imports/api/community/models";
import {Meteor} from "meteor/meteor";
import {CommunityMethods} from "/imports/api/names";

interface ICommunity {
    loading: boolean;

    getCommunity(): Promise<Community[]>;
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
        }
    }
})