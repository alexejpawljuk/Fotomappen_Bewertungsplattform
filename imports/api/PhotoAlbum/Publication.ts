import {Meteor} from "meteor/meteor";
import {PhotoAlbumCollection} from "/imports/api/PhotoAlbum/photoAlbumCollection";
import {noAuthError} from "/imports/utils/serverErrors";
import {PhotoAlbumPublication} from "/imports/api/names";

/**
 * Publishes a lightweight, reactive cursor for the user's "Fotomappen" (photo albums).
 *
 * How it's used:
 * - The client subscribes to this publication to *track changes* (add/update/remove) in the
 *   underlying albums owned by the current user.
 * - Once the subscription is ready, the client then invokes a separate method that fetches
 *   *aggregated data* composed from multiple documents; this pub deliberately exposes only
 *   the minimal identifiers needed to drive that aggregation.
 *
 * Security:
 * - If the user is not authenticated, we short-circuit with `noAuthError()`.
 *
 * Payload minimization:
 * - Only `_id` is published to reduce payload size; all other fields are resolved by the
 *   aggregation method on demand.
 */
Meteor.publish(PhotoAlbumPublication.LIST, async function () {
    if (!this.userId) {
        return noAuthError()
    }
    return PhotoAlbumCollection.find(
        {"owner.userId": this.userId},
        {fields: {_id: 1,}
    });
});