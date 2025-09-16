import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import LoginCard from "@/components/auth/LoginCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const Register = () => {
  const { user, profile, loading } = useAuth();

  if (!loading && user && profile) {
    const redirectPath = profile.role === "admin" ? "/admin-dashboard" : "/student-dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <div className="space-y-6 w-full max-w-2xl">
          <Card className="border-0 shadow-elegant text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold">สมัครใช้งาน Edulend Loan Hub</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-base">
              <p>ระบบใช้บัญชี Google ในการยืนยันตัวตน เพื่อให้การเข้าใช้งานปลอดภัยและง่ายที่สุด</p>
              <p>กดปุ่มด้านล่างเพื่อเข้าสู่ระบบหรือสมัครสมาชิกด้วยบัญชี Google ของคุณ</p>
            </CardContent>
          </Card>
          <LoginCard />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
