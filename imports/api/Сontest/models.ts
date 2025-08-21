interface Phase {
    startTime: Date;
    endTime: Date;
}

interface Phases {
    '1_phase': Phase
    '2_phase': Phase
}

export interface Contest {
    _id?: string;
    title: string;
    phases: Phases;
    createdAt: Date;
    owner: {
        userId: string;
    };

}

// GET methods

//SET methods