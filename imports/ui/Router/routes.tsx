import React from 'react';
import {Role} from "/imports/api/names";
import {HomePage} from "/imports/ui/Pages/HomePage/HomePage";
import {LoginPage} from "/imports/ui/Pages/LoginPage/LoginPage";
import {SignupPage} from "/imports/ui/Pages/SignupPage/SignupPage";
import {NotFoundPage} from "/imports/ui/Pages/NotFoundPage/NotFoundPage";
import {EmailVerifyPage} from "/imports/ui/Pages/EmailVerifyPage/EmailVerifyPage";
import {DashboardClubAdminLayout} from "/imports/ui/Pages/DashboardPage/ClubAdmin/DashboardClubAdminLayout";
import {DashboardSuperAdminLayout} from "/imports/ui/Pages/DashboardPage/SuperAdmin/DashboardSuperAdminLayout";
import {DashboardPhotoAlbums} from "/imports/ui/Pages/DashboardPage/ClubAdmin/PhotoAlbums/DashboardPhotoAlbums";
import {DashboardPhotoAlbum} from "/imports/ui/Pages/DashboardPage/ClubAdmin/PhotoAlbum/DashboardPhotoAlbum";
import {DashboardCommunity} from "/imports/ui/Pages/DashboardPage/SuperAdmin/Community/DashboardCommunity";
import {DashboardContests as DashboardContestsSuperAdmin} from "/imports/ui/Pages/DashboardPage/SuperAdmin/Contests/DashboardContests";
import {DashboardContests as DashboardContestsClubAdmin} from "/imports/ui/Pages/DashboardPage/ClubAdmin/Contests/DashboardContests";
import {DashboardContest as DashboardContestClubAdmin} from "/imports/ui/Pages/DashboardPage/ClubAdmin/Contest/DashboardContest";

export const publicRoutes = {
    home: {
        path: '/',
        element: (<HomePage/>),
    },
    login: {
        path: '/login',
        element: (<LoginPage/>),
    },
    signup: {
        path: '/signup',
        element: (<SignupPage/>),
    },
    verifyEmail: {
        path: '/verify-email/:token',
        element: (<EmailVerifyPage/>),
    },
    notFound: {
        path: '*',
        element: (<NotFoundPage/>),
    }
} as const

export const protectedRoutes = {
    [Role.CLUB_ADMIN]: {
        dashboardClubAdmin: {
            path: '/dashboard/club-admin',
            element: (<DashboardClubAdminLayout/>),
            requiredRole: Role.CLUB_ADMIN
        },
        dashboardPhotoAlbums: {
            path: '/dashboard/club-admin/photo-albums',
            element: (<DashboardPhotoAlbums/>),
            requiredRole: Role.CLUB_ADMIN
        },
        dashboardPhotoAlbum: {
            path: '/dashboard/club-admin/photo-album/:albumId',
            element: (<DashboardPhotoAlbum/>),
            requiredRole: Role.CLUB_ADMIN
        },
        dashboardContests: {
            path: '/dashboard/club-admin/contests',
            element: (<DashboardContestsClubAdmin/>),
            requiredRole: Role.CLUB_ADMIN
        },
        dashboardContest: {
            path: '/dashboard/club-admin/contests/:contestId',
            element: (<DashboardContestClubAdmin/>),
            requiredRole: Role.CLUB_ADMIN
        }
    },
    [Role.SUPER_ADMIN]: {
        dashboardSuperAdmin: {
            path: '/dashboard/super-admin',
            element: (<DashboardSuperAdminLayout/>),
            requiredRole: Role.SUPER_ADMIN
        },
        dashboardCommunity: {
            path: '/dashboard/super-admin/community',
            element: (<DashboardCommunity/>),
            requiredRole: Role.SUPER_ADMIN
        },
        dashboardContest: {
            path: '/dashboard/super-admin/contest',
            element: (<DashboardContestsSuperAdmin/>),
            requiredRole: Role.SUPER_ADMIN
        }
    }
} as const