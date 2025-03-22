import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProfilePage from "../components/profile/ProfilePage";
import { useAuth } from "../context/AuthContext";

const AccountPage = () => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">Loading...</div>
      </Layout>
    );
  }

  // Redirect if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <ProfilePage />
    </Layout>
  );
};

export default AccountPage;
