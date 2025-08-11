import {Meteor} from "/.meteor/local/build/programs/server/assets/packages/meteor/meteor";
import {Role} from "/imports/api/models";


interface Profile {
    clubName: string,
    role: Role
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
}