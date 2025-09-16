import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, LogIn } from "lucide-react";

const LoginCard = () => {
  const { signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      toast({
        title: "เข้าสู่ระบบสำเร็จ",
        description: "กำลังพาคุณไปยังแดชบอร์ด"
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "ไม่สามารถเข้าสู่ระบบได้";
      toast({ title: "เกิดข้อผิดพลาด", description: message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md w-full border-0 shadow-elegant">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-semibold">เข้าสู่ระบบ Edulend Loan Hub</CardTitle>
        <CardDescription className="text-base">
          จัดการการยืมคืนอุปกรณ์การศึกษาของคุณได้ง่าย ๆ ผ่านบัญชี Google
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button
          onClick={handleLogin}
          disabled={isLoading}
          className="h-12 text-base"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              กำลังเข้าสู่ระบบ...
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-5 w-5" />
              เข้าสู่ระบบด้วย Google
            </>
          )}
        </Button>
        <p className="text-sm text-muted-foreground text-center">
          ระบบจะบันทึกข้อมูลโปรไฟล์ของคุณเพื่อใช้งานในระบบยืม-คืนอุปกรณ์
        </p>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
