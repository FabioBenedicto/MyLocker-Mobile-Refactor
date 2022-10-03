import React, { useState } from 'react';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

import useUser from '../hooks/useUser';

export default function Routes() {
    const { user } = useUser();
    if (!user.ra) {
        return <AuthRoutes />;
    }
    return <AppRoutes />;
}
