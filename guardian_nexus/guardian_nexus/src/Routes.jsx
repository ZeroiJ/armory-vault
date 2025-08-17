import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoadoutBuilderOptimizer from './pages/loadout-builder-optimizer';
import Dashboard from './pages/dashboard';
import WeaponArmorDatabase from './pages/weapon-armor-database';
import CollectionsTriumphs from './pages/collections-triumphs';
import AuthenticationAuthorization from './pages/authentication-authorization';
import CharacterManagement from './pages/character-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AuthenticationAuthorization />} />
        <Route path="/loadout-builder-optimizer" element={<LoadoutBuilderOptimizer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/weapon-armor-database" element={<WeaponArmorDatabase />} />
        <Route path="/collections-triumphs" element={<CollectionsTriumphs />} />
        <Route path="/authentication-authorization" element={<AuthenticationAuthorization />} />
        <Route path="/character-management" element={<CharacterManagement />} />
        <Route path="/auth/callback" element={<AuthenticationAuthorization />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
