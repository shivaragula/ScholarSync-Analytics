import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import RevenueIntelligence from 'pages/revenue-intelligence';
import EnrollmentOverview from 'pages/enrollment-overview';
import RenewalAnalytics from 'pages/renewal-analytics';
import GoogleSheetsData from 'pages/google-sheets-data';
import TestConnection from 'pages/test-connection';
import InternshipDashboard from 'pages/internship-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<InternshipDashboard />} />
          <Route path="/internship-dashboard" element={<InternshipDashboard />} />
          <Route path="/revenue-intelligence" element={<RevenueIntelligence />} />
          <Route path="/enrollment-overview" element={<EnrollmentOverview />} />
          <Route path="/renewal-analytics" element={<RenewalAnalytics />} />
          <Route path="/google-sheets-data" element={<GoogleSheetsData />} />
          <Route path="/test-connection" element={<TestConnection />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
