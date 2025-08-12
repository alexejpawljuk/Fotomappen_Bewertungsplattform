import {Meteor} from 'meteor/meteor';
import {MethodSetClubAdminCreateModel} from "/imports/api/club_admin/models";
import {check} from 'meteor/check';
import {clientContentError, internalServerError} from "/imports/utils/serverErrors";
import {isEmail} from "validator";
import {stringContainsOnlyLettersAndNumbers} from "/imports/utils/check";
import {Accounts} from 'meteor/accounts-base';
import {Role} from "/imports/api/models";
import { Roles } from "meteor/alanning:roles";
import {CommunityCollection} from "/imports/api/community/community";
import {SignupError} from "/imports/utils/constans/text";


Meteor.methods({
    "set.user.create": async ({email, password, clubName, communityId}: MethodSetClubAdminCreateModel) => {
        console.log("Called set user create")
        check(email, String)
        check(password, String)
        check(clubName, String)

        const cleanEmail = email.trim().toLowerCase()
        if (!isEmail(cleanEmail)) {
            return clientContentError(SignupError.EMAIL_INVALID)
        }

        const community = CommunityCollection.findOne({_id: communityId})
        if (!community) {
            return clientContentError(SignupError.COMMUNITY_NOT_FOUND)
        }

        const cleanedClubName = clubName.trim()
        if (!stringContainsOnlyLettersAndNumbers(cleanedClubName)) {
            return clientContentError(SignupError.CLUB_NAME_INVALID_CHARS)
        }

        if (password.length < 8) {
            return clientContentError(SignupError.PASSWORD_TOO_SHORT)
        }

        const existing = Meteor.users.findOne({'emails.address': cleanEmail})
        if (existing) {
            return clientContentError(SignupError.EMAIL_TAKEN)
        }

        try {
            const clubAdmin = await Accounts.createUserAsync({
                email: cleanEmail,
                password,
                profile: {
                    clubName: cleanedClubName,
                    role: Role.CLUB_ADMIN,
                    communityId
                }
            });

            await Roles.addUsersToRolesAsync(clubAdmin, Role.CLUB_ADMIN)

            Accounts.sendVerificationEmail(clubAdmin);
        } catch (e: unknown) {
            if (e instanceof Meteor.Error) {
                return internalServerError(e.details || e.reason || e.message)
            }
            return internalServerError((e as Error).message || JSON.stringify(e))
        }
    }
})