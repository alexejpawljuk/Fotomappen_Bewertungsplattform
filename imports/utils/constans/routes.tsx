import React from 'react';
import {HomePage} from "/imports/ui/HomePage/HomePage";
import {LoginPage} from "/imports/ui/LoginPage/LoginPage";
import {SignupPage} from "/imports/ui/SignupPage/SignupPage";
import {NotFoundPage} from "/imports/ui/NotFoundPage/NotFoundPage";
import {EmailVerifyPage} from "/imports/ui/EmailVerifyPage/EmailVerifyPage";
import {DashboardClubAdminLayout} from "/imports/ui/DashboardPage/ClubAdmin/DashboardClubAdminLayout";
import {DashboardLayout} from "/imports/ui/DashboardPage/DashboardLayout";

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
    },
    dashboardSuperAdmin: {
        path: '/dashboard/super-admin',
        element: (<DashboardLayout/>),
    }
} as const