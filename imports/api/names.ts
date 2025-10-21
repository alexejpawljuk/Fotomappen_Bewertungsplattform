
// Collection names
export enum AvailableCollectionNames {
    CLUB_ADMIN = 'club_admin',
    SUPER_ADMIN = 'super_admin',
    COMMUNITY = 'community',
    PHOTO_ALBUM = 'photo_album',
    PHOTO = 'photo',
    CONTEST = 'contest',
}

// Role names
export enum Role {
    CLUB_ADMIN = 'club_admin',
    SUPER_ADMIN = 'super_admin',
}

// Community method names
export enum CommunityMethods {
    GET_COMMUNITY_BY_ID = 'get.community.ById',
    GET_COMMUNITY_ALL = 'get.communityAll',
    GET_COMMUNITY_LIST = 'get.community.list',
    SET_COMMUNITY_CREATE = 'set.community.create',
    UPDATE_COMMUNITY_BY_ID = 'update.community.byId',
    DELETE_COMMUNITY_BY_ID = 'delete.community.byId',
}

// User method names
export enum UserMethods {
    SET_CLUB_ADMIN_CREATE = "set.club_admin.create",
    // SET_SUPER_ADMIN_CREATE = "set.super_admin.create",
    GET_USER_SEND_VERIFICATION_EMAIL = "get.user.sendVerificationEmail",
}

// PhotoAlbum method names
export enum PhotoAlbumMethods {
    SET_PHOTO_ALBUM_CREATE = "set.photo_album.create",
    GET_PHOTO_ALBUM_LIST = "get.photo_album.list",
    GET_PHOTO_ALBUM_BY_ID = "get.photo_album.byId",
    DELETE_PHOTO_ALBUM_BY_ID = "delete.photo_album.byId",
    UPDATE_PHOTO_ALBUM_BY_ID = "update.photo_album.byId",
}

// Photo methods names
export enum PhotoMethods {
    GET_PHOTOS_LIST_BY_ALBUM_ID = "get.photos_list.by_photo_album_id",
    SET_PHOTO_BY_ALBUM_ID = "set.photo.by_photo_album_id",
    DELETE_PHOTO_BY_ID = "delete.photo.byId",
    UPDATE_PHOTO_BY_ID = "update.photo.byId",
}

// Contest methods manes
export enum ContestMethods {
    SET_CONTEST_CREATE = "set.contest.create",
}

export enum PhotoAlbumPublication {
    LIST = "photo_album.list",
}

export enum PhotoPublication {
    LIST = "photo.list",
}