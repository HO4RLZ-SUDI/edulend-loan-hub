import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import LoginCard from "@/components/auth/LoginCard";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const Login = () => {
  const { user, profile, loading } = useAuth();

  if (!loading && user && profile) {
    const redirectPath = profile.role === "admin" ? "/admin-dashboard" : "/student-dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        {loading ? <Skeleton className="w-full max-w-md h-64" /> : <LoginCard />}
      </div>
    </Layout>
  );
};

export default Login;
