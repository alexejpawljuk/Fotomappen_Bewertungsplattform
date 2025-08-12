import React from 'react';
import {HomePage} from "/imports/ui/HomePage/HomePage";
import {LoginPage} from "/imports/ui/LoginPage/LoginPage";
import {SignupPage} from "/imports/ui/SignupPage/SignupPage";
import {NotFoundPage} from "/imports/ui/NotFoundPage/NotFoundPage";
import {Dashboard} from "/imports/ui/DashboardPage/Dashboard";
import {VerifyEmailPage} from "/imports/ui/VerifyEmailPage/VerifyEmailPage";

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
        element: (<VerifyEmailPage/>),
    },
    notFound: {
        path: '/404',
        element: (<NotFoundPage/>),
    }
} as const

export const protectedRoutes = {
    dashboard: {
        path: '/dashboard',
        element: (<Dashboard/>),
    }
} as const