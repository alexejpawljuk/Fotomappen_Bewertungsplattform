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

// export interface ContestRow {
//     contestId: string;
//     title: string;
//     einreichungsphase: string ;
//     wettbewerbsphase: string;
//     fotoclubs: number;
//     auswertung: string | undefined;
// }

// GET methods
export interface MethodGetContestsListResponseModel {
    contestId: string;
    title: string;
    submissionPhase: Phase ;
    contestPhase: Phase;
    photo_albums: PhotoAlbum[];
    result: string | undefined;
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