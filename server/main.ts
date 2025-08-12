import "/imports/startup/server/imports"
import {Meteor} from "meteor/meteor";
import {ensureRoles} from "/imports/api/ensureRoles";


Meteor.startup(async () => {
    await ensureRoles()
    console.log('Startup complete ');
});