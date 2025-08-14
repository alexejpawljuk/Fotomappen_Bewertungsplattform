import {Accounts} from 'meteor/accounts-base'
import {Meteor} from 'meteor/meteor'


Accounts.config({ sendVerificationEmail: true });

/**
 * A URL endpoint used to verify a user's email address.
 * This is typically used in conjunction with an email verification system.
 * When accessing this URL, the system verifies the token provided to confirm
 * the ownership of the email address associated with it.
 */
Accounts.urls.verifyEmail = (token) => Meteor.absoluteUrl(`verify-email/${token}`);
