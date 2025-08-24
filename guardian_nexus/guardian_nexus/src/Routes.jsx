import React from "react";
import { HashRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoadoutBuilderOptimizer from './pages/loadout-builder-optimizer';
import Dashboard from './pages/dashboard';
import WeaponArmorDatabase from './pages/weapon-armor-database';
import CollectionsTriumphs from './pages/collections-triumphs';
import AuthenticationAuthorization from './pages/authentication-authorization';
import CharacterManagement from './pages/character-management';
import PrivateRoute from "components/PrivateRoute";

const Routes = () => {
  return (
    <HashRouter basename={import.meta.env.BASE_URL}>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AuthenticationAuthorization />} />
        <Route path="/loadout-builder-optimizer" element={<PrivateRoute><LoadoutBuilderOptimizer /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/weapon-armor-database" element={<PrivateRoute><WeaponArmorDatabase /></PrivateRoute>} />
        <Route path="/collections-triumphs" element={<PrivateRoute><CollectionsTriumphs /></PrivateRoute>} />
        <Route path="/authentication-authorization" element={<AuthenticationAuthorization />} />
        <Route path="/character-management" element={<PrivateRoute><CharacterManagement /></PrivateRoute>} />
        <Route path="/auth/callback" element={<AuthenticationAuthorization />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </HashRouter>
  );
};

export default Routes;
