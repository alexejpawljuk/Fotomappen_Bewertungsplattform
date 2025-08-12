import {Accounts} from 'meteor/accounts-base'
import {Meteor} from 'meteor/meteor'

Accounts.config({ sendVerificationEmail: true });
Accounts.urls.verifyEmail = (token) => Meteor.absoluteUrl(`verify-email/${token}`);
