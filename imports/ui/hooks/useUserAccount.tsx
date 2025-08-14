import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

export const useUserAccount = () => {
    return useTracker(() => {
        const user = Meteor.user();
        const userId = Meteor.userId();
        const loggingIn = Meteor.loggingIn();
        const loggedIn = !!userId && !loggingIn;

        return { user, userId, loggedIn, loggingIn };
    }, []);
};