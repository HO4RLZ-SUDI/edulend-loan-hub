import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Users, 
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Settings,
  BarChart3,
  Clock,
  CheckCircle
} from "lucide-react";

const AdminDashboard = () => {
  // Mock data for demonstration
  const equipmentList = [
    {
      id: 1,
      name: "โน๊ตบุ๊ค Lenovo ThinkPad",
      category: "คอมพิวเตอร์",
      status: "ถูกยืม",
      borrower: "สมชาย ใจดี",
      dueDate: "2024-01-22"
    },
    {
      id: 2,
      name: "กล้องจุลทรรศน์ Olympus",
      category: "อุปกรณ์วิทยาศาสตร์",
      status: "เลยกำหนด",
      borrower: "สมชาย ใจดี",
      dueDate: "2024-01-17"
    },
    {
      id: 3,
      name: "iPad Air (รุ่นใหม่)",
      category: "แท็บเล็ต",
      status: "พร้อมใช้",
      borrower: "-",
      dueDate: "-"
    }
  ];

  const borrowRequests = [
    {
      id: 1,
      student: "สมหญิง ดีมาก",
      item: "เครื่องคิดเลข Casio fx-991ES",
      requestDate: "2024-01-16",
      status: "รอตรวจสอบ"
    },
    {
      id: 2,
      student: "สมศักดิ์ เรียนดี",
      item: "หูฟัง Sony WH-1000XM4",
      requestDate: "2024-01-16",
      status: "อนุมัติแล้ว"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard แอดมิน</h1>
              <p className="text-muted-foreground mt-1">จัดการระบบยืม-คืนอุปกรณ์การศึกษา</p>
            </div>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>เพิ่มอุปกรณ์ใหม่</span>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-elegant">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">อุปกรณ์ทั้งหมด</p>
                    <p className="text-2xl font-bold text-foreground">45</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-elegant">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">กำลังถูกยืม</p>
                    <p className="text-2xl font-bold text-warning">12</p>
                  </div>
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-elegant">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">เลยกำหนด</p>
                    <p className="text-2xl font-bold text-destructive">3</p>
                  </div>
                  <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-elegant">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">ผู้ใช้งาน</p>
                    <p className="text-2xl font-bold text-success">156</p>
                  </div>
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="equipment" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="equipment" className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span>จัดการอุปกรณ์</span>
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>คำขอยืม</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>รายงาน</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>ตั้งค่า</span>
              </TabsTrigger>
            </TabsList>

            {/* Equipment Management */}
            <TabsContent value="equipment">
              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>รายการอุปกรณ์</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="ค้นหาอุปกรณ์..."
                          className="pl-10 w-80"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {equipmentList.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                          {item.borrower !== "-" && (
                            <p className="text-xs text-muted-foreground mt-1">
                              ผู้ยืม: {item.borrower} | กำหนดคืน: {item.dueDate}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant={
                            item.status === "เลยกำหนด" ? "destructive" :
                            item.status === "ถูกยืม" ? "secondary" : 
                            "default"
                          }>
                            {item.status}
                          </Badge>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              แก้ไข
                            </Button>
                            <Button size="sm" variant="outline">
                              ลบ
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Borrow Requests */}
            <TabsContent value="requests">
              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle>คำขอยืมอุปกรณ์</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {borrowRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{request.student}</h4>
                          <p className="text-sm text-muted-foreground">ขอยืม: {request.item}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            วันที่ขอ: {request.requestDate}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant={request.status === "รอตรวจสอบ" ? "secondary" : "default"}>
                            {request.status}
                          </Badge>
                          {request.status === "รอตรวจสอบ" && (
                            <div className="flex space-x-2">
                              <Button size="sm" className="bg-success text-white hover:bg-success/90">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                อนุมัติ
                              </Button>
                              <Button size="sm" variant="destructive">
                                ปฏิเสธ
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics */}
            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-elegant">
                  <CardHeader>
                    <CardTitle>สถิติการใช้งาน</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">กราฟและสถิติจะแสดงที่นี่</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-elegant">
                  <CardHeader>
                    <CardTitle>อุปกรณ์ยอดนิยม</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">โน๊ตบุ๊ค</span>
                        <Badge>25 ครั้ง</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">แท็บเล็ต</span>
                        <Badge>18 ครั้ง</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">กล้องจุลทรรศน์</span>
                        <Badge>12 ครั้ง</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings">
              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle>การตั้งค่าระบบ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">ระยะเวลาการยืม (วัน)</h4>
                      <Input type="number" defaultValue="7" className="w-32" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">การแจ้งเตือน</h4>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">แจ้งเตือนก่อนครบกำหนด 1 วัน</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">แจ้งเตือนเมื่อเลยกำหนด</span>
                        </label>
                      </div>
                    </div>
                    <Button>บันทึกการตั้งค่า</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;