import { Roles } from "meteor/alanning:roles";
import {Role} from "/imports/api/models";

export const ensureRoles = async () => {
    await Roles.createRoleAsync(Role.SUPER_ADMIN, { unlessExists: true });
    await Roles.createRoleAsync(Role.CLUB_ADMIN, { unlessExists: true });
}