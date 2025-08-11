import {Meteor} from 'meteor/meteor';
import {MethodSetClubAdminCreateModel} from "/imports/api/club_admin/models";
import {check} from 'meteor/check';
import {clientContentError} from "/imports/utils/serverErrors";
import {isEmail} from "validator";
import {stringContainsOnlyLettersAndNumbers} from "/imports/utils/check";
import {Accounts} from 'meteor/accounts-base';
import {Role} from "/imports/api/models";

Meteor.methods({
    "set.user.create": async ({email, password, clubName}: MethodSetClubAdminCreateModel) => {
        console.log("Called set user create")
        check(email, String)
        check(password, String)
        check(clubName, String)

        const cleanEmail = email.trim()
        if (!isEmail(cleanEmail)) {
            return clientContentError("Invalid email")
        }

        if (password.length < 8) {
            return clientContentError("Password is too short")
        }

        const cleanedClubName = clubName.trim()
        if (!stringContainsOnlyLettersAndNumbers(cleanedClubName)) {
            return clientContentError("Club name can only contain letters and numbers")
        }

        const existing = Meteor.users.findOne({'emails.address': cleanEmail})
        console.log(existing)
        if (existing) {
            return clientContentError("This email is already taken")
        }

        await Accounts.createUserAsync({
            email: cleanEmail,
            password,
            profile: {
                clubName: cleanedClubName,
                role: Role.CLUB_ADMIN
            }
        });
    }
})