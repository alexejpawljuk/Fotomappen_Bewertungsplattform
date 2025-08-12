import React from 'react';
import {HomePage} from "/imports/ui/HomePage/HomePage";
import {LoginPage} from "/imports/ui/LoginPage/LoginPage";
import {SignupPage} from "/imports/ui/SignupPage/SignupPage";
import {NotFoundPage} from "/imports/ui/NotFoundPage/NotFoundPage";
import {DashboardLayout} from "/imports/ui/DashboardPage/DashboardLayout";
import {EmailVerifyPage} from "/imports/ui/EmailVerifyPage/EmailVerifyPage";

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
    dashboard: {
        path: '/dashboard',
        element: (<DashboardLayout/>),
    }
} as const