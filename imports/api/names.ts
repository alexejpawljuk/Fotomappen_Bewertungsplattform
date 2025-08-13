
// Collection names
export enum AvailableCollectionNames {
    CLUB_ADMIN = 'club_admin',
    SUPER_ADMIN = 'super_admin',
    COMMUNITY = 'community',
}

// Role names
export enum Role {
    CLUB_ADMIN = 'club_admin',
    SUPER_ADMIN = 'super_admin',
}

// Community method names
export enum CommunityMethods {
    GET_COMMUNITY_ALL = 'get.communityAll',
    SET_COMMUNITY_CREATE = 'set.community.create',
}

// User method names
export enum UserMethods {
    SET_CLUB_ADMIN_CREATE = "set.club_admin.create",
    // SET_SUPER_ADMIN_CREATE = "set.super_admin.create",
    POST_USER_SEND_VERIFICATION_EMAIL = "post.user.sendVerificationEmail",
}