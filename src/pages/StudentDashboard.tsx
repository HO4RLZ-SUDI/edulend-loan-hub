import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Clock, 
  Package, 
  Search,
  Filter,
  Calendar,
  User
} from "lucide-react";

const StudentDashboard = () => {
  // Mock data for demonstration
  const borrowedItems = [
    {
      id: 1,
      name: "โน๊ตบุ๊ค Lenovo ThinkPad",
      category: "คอมพิวเตอร์",
      borrowDate: "2024-01-15",
      dueDate: "2024-01-22",
      status: "กำลังยืม"
    },
    {
      id: 2,
      name: "กล้องจุลทรรศน์ Olympus",
      category: "อุปกรณ์วิทยาศาสตร์",
      borrowDate: "2024-01-10",
      dueDate: "2024-01-17",
      status: "เลยกำหนด"
    }
  ];

  const availableItems = [
    {
      id: 3,
      name: "iPad Air (รุ่นใหม่)",
      category: "แท็บเล็ต",
      available: true,
      location: "ห้องคลังอุปกรณ์ ชั้น 2"
    },
    {
      id: 4,
      name: "เครื่องคิดเลข Casio fx-991ES",
      category: "เครื่องคิดเลข",
      available: true,
      location: "ห้องคณิตศาสตร์"
    },
    {
      id: 5,
      name: "หูฟัง Sony WH-1000XM4",
      category: "อุปกรณ์เสียง",
      available: false,
      location: "ห้องดนตรี"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Dashboard นักเรียน</h1>
                <p className="text-muted-foreground mt-1">จัดการการยืม-คืนอุปกรณ์การศึกษา</p>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">สวัสดี, สมชาย ใจดี</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-elegant">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">กำลังยืม</p>
                    <p className="text-2xl font-bold text-foreground">2</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-elegant">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">เลยกำหนด</p>
                    <p className="text-2xl font-bold text-destructive">1</p>
                  </div>
                  <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-destructive" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-elegant">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">พร้อมยืม</p>
                    <p className="text-2xl font-bold text-success">15</p>
                  </div>
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Currently Borrowed Items */}
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>อุปกรณ์ที่ยืมอยู่</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {borrowedItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>ยืม: {item.borrowDate}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>คืน: {item.dueDate}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge variant={item.status === "เลยกำหนด" ? "destructive" : "secondary"}>
                        {item.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        คืนอุปกรณ์
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Available Items */}
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>อุปกรณ์ที่พร้อมยืม</span>
                </CardTitle>
                <div className="flex items-center space-x-2 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="ค้นหาอุปกรณ์..."
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.location}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge variant={item.available ? "default" : "secondary"}>
                        {item.available ? "พร้อมใช้" : "ไม่พร้อม"}
                      </Badge>
                      <Button 
                        size="sm" 
                        disabled={!item.available}
                        className="min-w-[80px]"
                      >
                        {item.available ? "ยืมเลย" : "ไม่พร้อม"}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;