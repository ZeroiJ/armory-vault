import React from "react";
import { HashRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import LoadoutBuilderOptimizer from './pages/loadout-builder-optimizer';
import Dashboard from './pages/dashboard';
import WeaponArmorDatabase from './pages/weapon-armor-database';
import CollectionsTriumphs from './pages/collections-triumphs';
import AuthenticationAuthorization from './pages/authentication-authorization';
import CharacterManagement from './pages/character-management';

const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};

const Routes = () => {
  return (
    <HashRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<AuthenticationAuthorization />} />
          <Route path="/loadout-builder-optimizer" element={<ProtectedRoute component={LoadoutBuilderOptimizer} />} />
          <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
          <Route path="/weapon-armor-database" element={<ProtectedRoute component={WeaponArmorDatabase} />} />
          <Route path="/collections-triumphs" element={<ProtectedRoute component={CollectionsTriumphs} />} />
          <Route path="/character-management" element={<ProtectedRoute component={CharacterManagement} />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </HashRouter>
  );
};

export default Routes;