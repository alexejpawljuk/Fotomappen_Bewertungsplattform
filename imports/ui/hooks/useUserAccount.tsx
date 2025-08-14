import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";


/**
 * A custom hook that provides reactive data related to the current user's account.
 *
 * This hook tracks the current user's account information using Meteor's reactive
 * data sources. It provides details about the logged-in user's object, the user's ID,
 * and the current authentication state (e.g., whether the user is logged in or logging in).
 *
 * @returns {Object} An object containing the following properties:
 * - user: The current logged-in user's data object from Meteor.user().
 * - userId: The ID of the current logged-in user, or null if not logged in.
 * - loggedIn: A boolean indicating whether the user is logged in and not in the process of logging in.
 * - loggingIn: A boolean indicating whether the user is currently in the process of logging in.
 */
export const useUserAccount = () => {
    return useTracker(() => {
        const user = Meteor.user();
        const userId = Meteor.userId();
        const loggingIn = Meteor.loggingIn();
        const loggedIn = !!userId && !loggingIn;

        return { user, userId, loggedIn, loggingIn };
    }, []);
};