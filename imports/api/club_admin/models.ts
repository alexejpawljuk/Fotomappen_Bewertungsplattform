import {Meteor} from "meteor/meteor"
import {Role} from "/imports/api/models"


interface Profile {
    clubName: string
    role: Role
    communityId: string
}

export class ClubAdmin implements Meteor.User {
    _id!: string;
    emails!: Meteor.UserEmail[];
    createdAt!: Date;
    profile!: Profile
    services!: {}
}

// GET METHODS


// SET METHODS
export interface MethodSetClubAdminCreateModel {
    email: string,
    password: string,
    clubName: string,
    communityId: string,
}