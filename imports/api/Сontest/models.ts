import {PhotoAlbum} from "/imports/api/PhotoAlbum/models";

interface Phase {
    start: string;
    end: string;
}

export interface Contest {
    _id?: string;
    title: string;
    phases: {
        submissionPhase: Phase
        contestPhase: Phase
    };
    createdAt: Date;
    owner: {
        userId: string;
    };
}

// GET methods
export interface MethodGetContestsListResponseModel {
    contestId: string;
    title: string;
    submissionPhase: Phase ;
    contestPhase: Phase;
    photo_albums: PhotoAlbum[];
    result: string | undefined;
}

export interface MethodGetContestsListPagedRequestModel {
    page?: number;
    pageSize?: number;
    search?: string;
}
export interface MethodGetContestsListPagedResponseModel {
    items: MethodGetContestsListResponseModel[];
    total: number;
}

export interface MethodGetContestByIdRequestModel {
    contestId: string;
}
export interface MethodGetContestByIdResponseModel {
    contest: Contest;
    photoAlbums: PhotoAlbum[];
}

//SET methods
export interface MethodSetContestCreateRequestModel {
    title: string;
    submissionPhase: {
        date: {
            start: string;
            end: string;
        }
    }
    contestPhase: {
        date: {
            start: string;
            end: string;
        }
    }
}

export interface MethodSetPhotoAlbumToContestRequestModel {
    contestId: string
    photoAlbumId: string
}