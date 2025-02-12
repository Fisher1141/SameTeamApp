// File: Routes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../../src/components/common/Layout';
import ParentDashboard from '../../src/components/pages/ParentDashboard';
import Home from '../../src/components/pages/Home';
import Chores from '../../src/components/pages/ChoreList';
import Profile from '../../src/components/pages/ProfileSetup';
import SignIn from '../../src/components/pages/SignIn';
import SignUp from '../../src/components/pages/SignUp';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="parenDashboard" element={<ParentDashboard />} />
                <Route path="chores" element={<Chores />} />
                <Route path="profile" element={<Profile />} />
                <Route path="login" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
