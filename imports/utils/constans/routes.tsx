import React from 'react';
import {HomePage} from "/imports/ui/HomePage/HomePage";
import {LoginPage} from "/imports/ui/LoginPage/LoginPage";
import {SignupPage} from "/imports/ui/SignupPage/SignupPage";
import {NotFoundPage} from "/imports/ui/NotFoundPage/NotFoundPage";

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
    default: {
        path: '*',
        element: (<NotFoundPage/>),
    }
} as const

export const protectedRoutes = {
    temp: {
        path: '/test',
        element: (<></>),
    }
} as const