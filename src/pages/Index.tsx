import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout/Layout";
import heroImage from "@/assets/hero-image.jpg";
import { 
  BookOpen, 
  Users, 
  Shield, 
  Smartphone, 
  Clock, 
  BarChart3,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "จัดการอุปกรณ์ง่ายดาย",
      description: "เพิ่ม แก้ไข และติดตามอุปกรณ์การศึกษาทั้งหมดในที่เดียว"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "ระบบผู้ใช้หลายระดับ",
      description: "แยกสิทธิ์การใช้งานระหว่างนักเรียนและแอดมิน"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "ความปลอดภัยสูง",
      description: "เข้าสู่ระบบด้วย Google Account ปลอดภัยและเชื่อถือได้"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "ใช้งานได้ทุกอุปกรণ์",
      description: "รองรับการใช้งานบนมือถือ แท็บเล็ต และคอมพิวเตอร์"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "ติดตามเวลาคืน",
      description: "ระบบแจ้งเตือนเมื่อใกล้ครบกำหนดคืนอุปกรณ์"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "รายงานและสถิติ",
      description: "วิเคราะห์ข้อมูลการใช้งานและสถิติอุปกรณ์"
    }
  ];

  const benefits = [
    "ลดเวลาในการจัดการอุปกรณ์",
    "ป้องกันอุปกรณ์สูญหาย", 
    "เพิ่มประสิทธิภาพการเรียนการสอน",
    "ติดตามการใช้งานได้แบบเรียลไทม์"
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-light via-background to-secondary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  <span className="gradient-primary bg-clip-text text-transparent">
                    Edulend
                  </span>
                  <br />
                  ระบบจัดการยืมคืนอุปกรณ์การศึกษา
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  ทันสมัย ใช้งานง่าย และมีประสิทธิภาพ สำหรับสถานศึกษาในยุคดิจิทัล
                  พร้อมระบบติดตามและจัดการที่ครบครัน
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                  <Link to="/register">
                    เริ่มใช้งานฟรี
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                  <Link to="/demo">ดูตัวอย่างระบบ</Link>
                </Button>
              </div>
            </div>

            <div className="animate-slide-up">
              <div className="relative">
                <img
                  src={heroImage}
                  alt="Edulend - ระบบจัดการยืมคืนอุปกรณ์การศึกษา"
                  className="w-full h-auto rounded-2xl shadow-elegant hover-lift"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              คุณสมบัติเด่นของระบบ
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              ออกแบบมาเพื่อตอบโจทย์การจัดการอุปกรณ์การศึกษาอย่างครบครันและมีประสิทธิภาพ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift border-0 shadow-elegant">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto gradient-primary rounded-2xl flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                  ทำไมต้องเลือก Edulend?
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  ระบบที่ถูกออกแบบมาเพื่อแก้ไขปัญหาการจัดการอุปกรณ์การศึกษา
                  ให้เป็นไปอย่างมีระบบและมีประสิทธิภาพ
                </p>
              </div>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0" />
                    <span className="text-foreground text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/register">
                  เริ่มต้นใช้งานเลย
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="lg:order-first">
              <Card className="border-0 shadow-elegant overflow-hidden">
                <div className="bg-gradient-secondary p-8 text-white text-center">
                  <h3 className="text-2xl font-bold mb-4">พร้อมใช้งานทันที</h3>
                  <p className="text-lg opacity-90 mb-6">
                    ไม่ต้องติดตั้งซอฟต์แวร์เพิ่มเติม
                    เข้าใช้งานผ่านเว็บเบราว์เซอร์
                  </p>
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
                    <Link to="/demo">ทดลองใช้ฟรี</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold">
              พร้อมเริ่มต้นแล้วหรือยัง?
            </h2>
            <p className="text-xl opacity-90 leading-relaxed">
              เข้าร่วมกับสถานศึกษาหลายร้อยแห่งที่เลือกใช้ Edulend 
              เพื่อจัดการอุปกรณ์การศึกษาอย่างมีประสิทธิภาพ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/register">สมัครใช้งานฟรี</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/contact">ติดต่อสอบถาม</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
