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