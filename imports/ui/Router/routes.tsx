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
        }
    },
    [Role.SUPER_ADMIN]: {
        dashboardSuperAdmin: {
            path: '/dashboard/super-admin',
            element: (<DashboardSuperAdminLayout/>),
            requiredRole: Role.SUPER_ADMIN
        }
    },
    // dashboardClubAdmin: {
    //     path: '/dashboard/club-admin',
    //     element: (<DashboardClubAdminLayout/>),
    //     requiredRole: Role.CLUB_ADMIN
    // },
    // dashboardSuperAdmin: {
    //     path: '/dashboard/super-admin',
    //     element: (<DashboardSuperAdminLayout/>),
    //     requiredRole: Role.SUPER_ADMIN
    // }
} as const