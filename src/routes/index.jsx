import React from 'react';

import Loading from '../components/Loading';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

import useUser from '../hooks/useUser';

export default function Routes() {
    const { user, isLoaded } = useUser();
    if (user.ra) {
        return <AppRoutes />;
    }
    if (!isLoaded) {
        return <Loading />;
    }
    return <AuthRoutes />;
}
