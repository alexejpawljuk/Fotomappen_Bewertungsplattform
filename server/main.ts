import "/imports/startup/server/imports"
import {Meteor} from "meteor/meteor";
import {ensureRoles} from "/imports/api/ensureRoles";
import { Accounts } from "meteor/accounts-base";
import {Role} from "/imports/api/names";
import { Roles } from "meteor/alanning:roles";


Meteor.startup(async () => {
    await ensureRoles()
    await initSuperAdmin()
    console.log('Startup complete ');
});


// Temp
const initSuperAdmin = async () => {

    const exists = Accounts.findUserByEmail("super_admin@hotmail.com")
    if (exists) return;

    const super_admin = await Accounts.createUserAsync({
        email: "super_admin@hotmail.com",
        password: "0123456789",
        profile: {
            clubName: "",
            role: Role.SUPER_ADMIN,
            communityId: ""
        }
    })
    await Roles.addUsersToRolesAsync(super_admin, Role.SUPER_ADMIN)
    Accounts.sendVerificationEmail(super_admin);
}