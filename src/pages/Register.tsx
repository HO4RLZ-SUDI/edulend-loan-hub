import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout/Layout";
import { Mail, Lock, User, GraduationCap } from "lucide-react";

const Register = () => {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-foreground">สมัครสมาชิก</h2>
            <p className="mt-2 text-muted-foreground">
              เริ่มต้นใช้งาน Edulend เพื่อจัดการอุปกรณ์การศึกษา
            </p>
          </div>

          <Card className="shadow-elegant border-0">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-center">สร้างบัญชีใหม่</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Google Sign Up Button */}
              <Button 
                variant="outline" 
                className="w-full h-12 text-base border-2 hover:bg-muted/50"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                สมัครด้วย Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-4 text-muted-foreground">หรือ</span>
                </div>
              </div>

              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">ชื่อ-นามสกุล</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="กรอกชื่อ-นามสกุลของคุณ"
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">อีเมล</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="กรอกอีเมลของคุณ"
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">ประเภทผู้ใช้งาน</Label>
                  <Select>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="เลือกประเภทผู้ใช้งาน" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">นักเรียน/นักศึกษา</SelectItem>
                      <SelectItem value="admin">แอดมิน/ครู</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">รหัสผ่าน</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="สร้างรหัสผ่าน (อย่างน้อย 8 ตัวอักษร)"
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">ยืนยันรหัสผ่าน</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="ยืนยันรหัสผ่านอีกครั้ง"
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="rounded border-border mt-1"
                    required
                  />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                    ฉันยอมรับ{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      เงื่อนไขการใช้งาน
                    </Link>
                    {" "}และ{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      นโยบายความเป็นส่วนตัว
                    </Link>
                  </Label>
                </div>

                <Button type="submit" className="w-full h-12 text-base">
                  สร้างบัญชี
                </Button>
              </form>

              <div className="text-center">
                <span className="text-muted-foreground">มีบัญชีแล้ว? </span>
                <Link to="/login" className="text-primary hover:underline font-medium">
                  เข้าสู่ระบบที่นี่
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Register;