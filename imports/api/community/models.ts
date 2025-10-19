export interface Community {
    _id?: string;
    name: string;
    createdAt: Date;
}

// GET Methods
export interface MethodGetCommunitiesAllResponseModel {
    communities: Community[];
}

export interface MethodGetCommunityByIdRequestModel {
    communityId: string;
}
export interface MethodGetCommunityByIdResponseModel {
    community: Community;
}

// SET Methods
export interface MethodSetCommunityRequestModel {
    title: string;
}