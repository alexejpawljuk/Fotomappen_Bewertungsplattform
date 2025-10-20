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

export interface MethodGetCommunityListResponseModel {
    communityId: string;
    title: string
    createdAt: Date;
    clubs: number;
}

// SET Methods
export interface MethodSetCommunityRequestModel {
    title: string;
}

// UPDATE Methods
export interface MethodUpdateCommunityByIdRequestModel {
    communityId: string;
    title: string;
}