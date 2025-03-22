import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/account" replace />;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Login to Your Account
        </h1>
        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;
