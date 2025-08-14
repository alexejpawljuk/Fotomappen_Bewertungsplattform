import React from 'react';
import {LoginPage} from "/imports/ui/Pages/LoginPage/LoginPage";
import {SignupPage} from "/imports/ui/Pages/SignupPage/SignupPage";
import {NotFoundPage} from "/imports/ui/Pages/NotFoundPage/NotFoundPage";
import {EmailVerifyPage} from "/imports/ui/Pages/EmailVerifyPage/EmailVerifyPage";
import {DashboardClubAdminLayout} from "/imports/ui/Pages/DashboardPage/ClubAdmin/DashboardClubAdminLayout";
import {HomePage} from "/imports/ui/Pages/HomePage/HomePage";
import {Role} from "/imports/api/names";
import {DashboardSuperAdminLayout} from "/imports/ui/Pages/DashboardPage/SuperAdmin/DashboardSuperAdminLayout";

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
    // dashboard: {
    //     path: '/dashboard',
    //     element: (<DashboardLayout/>),
    // },
    dashboardClubAdmin: {
        path: '/dashboard/club-admin',
        element: (<DashboardClubAdminLayout/>),
        requiredRole: Role.CLUB_ADMIN
    },
    dashboardSuperAdmin: {
        path: '/dashboard/super-admin',
        element: (<DashboardSuperAdminLayout/>),
        requiredRole: Role.SUPER_ADMIN
    }
} as const