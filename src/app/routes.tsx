import React from 'react';
import { createMemoryRouter, Navigate } from 'react-router';
import { Root } from './components/Root';
import { Landing } from './screens/Landing';
import { Onboarding } from './screens/Onboarding';
import { ProfileSetup } from './screens/ProfileSetup';
import { Profile } from './screens/Profile';
import { Home } from './screens/Home';
import { OpportunityDetail } from './screens/OpportunityDetail';
import { CircleDetail } from './screens/CircleDetail';
import { MyEncore } from './screens/MyEncore';
import { ForCommunity } from './screens/ForCommunity';

export const router = createMemoryRouter(
  [
    {
      element: <Root />,
      children: [
        { path: '/',                 element: <Landing /> },
        { path: '/onboarding',       element: <Onboarding /> },
        { path: '/setup',            element: <ProfileSetup /> },
        { path: '/profile',          element: <Profile /> },
        { path: '/home',             element: <Home /> },
        { path: '/opportunity/:id',  element: <OpportunityDetail /> },
        { path: '/circle/:id',       element: <CircleDetail /> },
        { path: '/my-encore',        element: <MyEncore /> },
        { path: '/community',        element: <ForCommunity /> },
        { path: '*',                 element: <Navigate to="/" replace /> },
      ],
    },
  ],
  { initialEntries: ['/'], initialIndex: 0 }
);