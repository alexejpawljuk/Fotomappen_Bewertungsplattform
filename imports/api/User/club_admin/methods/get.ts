import {Meteor} from "meteor/meteor"
import {UserMethods} from "/imports/api/names";
import {noAuthError} from "/imports/utils/serverErrors";
import {Accounts} from "meteor/accounts-base";

Meteor.methods({
    async [UserMethods.GET_USER_SEND_VERIFICATION_EMAIL] () {
        if (!this.userId) {
            return noAuthError()
        }

        const user = Meteor.users.findOne(this.userId, { fields: { emails: 1 } });
        const email = user?.emails?.[0];
        if (!email?.address) {
            throw new Meteor.Error('no-email', 'No email for this user');
        }
        if (email.verified) {
            throw new Meteor.Error('already-verified', 'Email already verified');
        }

        Accounts.sendVerificationEmail(this.userId);
        return { ok: true };
    }
})