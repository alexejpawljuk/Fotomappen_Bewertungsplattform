import {Meteor} from 'meteor/meteor';
import {MethodSetClubAdminCreateModel} from "/imports/api/User/models";
import {check} from 'meteor/check';
import {clientContentError, internalServerError} from "/imports/utils/serverErrors";
import {isEmail} from "validator";
import {stringContainsOnlyLettersAndNumbers} from "/imports/utils/check";
import {Accounts} from 'meteor/accounts-base';
import {Role, UserMethods} from "/imports/api/names";
import {Roles} from "meteor/alanning:roles";
import {CommunityCollectionCollection} from "/imports/api/community/communityCollection";
import {SignupError} from "/imports/utils/constans/text";


Meteor.methods({
    [UserMethods.SET_CLUB_ADMIN_CREATE]: async ({
        email,
        password,
        clubName,
        communityId
    }: MethodSetClubAdminCreateModel) => {
        check(email, String)
        check(password, String)
        check(clubName, String)

        const cleanEmail = email.trim().toLowerCase()
        if (!isEmail(cleanEmail)) {
            return clientContentError(SignupError.EMAIL_INVALID)
        }

        const community = CommunityCollectionCollection.findOne({_id: communityId})
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
            const userId = await Accounts.createUserAsync({
                email: cleanEmail,
                password,
                profile: {
                    clubName: cleanedClubName,
                    role: Role.CLUB_ADMIN,
                    communityId
                }
            });

            await Roles.addUsersToRolesAsync(userId, Role.CLUB_ADMIN)

            Accounts.sendVerificationEmail(userId);

            return { ok: true, userId };

            // Temp
            // const super_admin = await Accounts.createUserAsync({
            //     email: "a.pawljuk@hotmail.com",
            //     password: "0123456789",
            //     profile: {
            //         clubName: "",
            //         role: Role.SUPER_ADMIN,
            //         communityId: ""
            //     }
            // })
            // await Roles.addUsersToRolesAsync(super_admin, Role.SUPER_ADMIN)
            // Accounts.sendVerificationEmail(clubAdmin);

        } catch (e: unknown) {
            if (e instanceof Meteor.Error) {
                return internalServerError(e.details || e.reason || e.message)
            }
            return internalServerError((e as Error).message || JSON.stringify(e))
        }
    }
})