export interface Community {
    _id?: string;
    name: string;
    createdAt: Date;
}

// GET Methods
export interface MethodGetCommunitiesAllResponseModel {
    communities: Community[];
}

// SET Methods
export interface MethodSetCommunityRequestModel {
    title: string;
}