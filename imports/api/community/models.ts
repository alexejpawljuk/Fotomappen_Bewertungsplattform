export interface Community {
    _id: string;
    name: string;
    createdAt: Date;
}

export interface MethodGetCommunitiesAllResponseModel {
    communities: Community[];
}