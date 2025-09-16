import { addDays } from "date-fns";
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import ItemList from "@/components/dashboard/ItemList";
import LoanList from "@/components/dashboard/LoanList";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import useItems from "@/hooks/useItems";
import useLoans from "@/hooks/useLoans";
import type { Item } from "@/types/firebase";
import { BookOpenCheck, CalendarClock, UserCircle } from "lucide-react";

const StudentDashboard = () => {
  const { user, profile, loading } = useAuth();
  const { toast } = useToast();
  const { items, loading: itemsLoading } = useItems(Boolean(user));
  const { loans, loading: loansLoading, borrowItem } = useLoans({
    userId: profile?.uid,
    enabled: Boolean(profile?.uid),
    isAdmin: false
  });

  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }

  if (!loading && profile?.role === "admin") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  const handleBorrow = async (item: Item) => {
    if (!profile) return;
    try {
      const dueDate = addDays(new Date(), 7);
      await borrowItem({ item, user: profile, dueDate });
      toast({ title: "ส่งคำขอยืมสำเร็จ", description: "สามารถติดตามสถานะได้ในรายการของคุณ" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "ไม่สามารถยืมอุปกรณ์ได้";
      toast({ title: "เกิดข้อผิดพลาด", description: message, variant: "destructive" });
    }
  };

  return (
    <Layout>
      <div className="bg-muted/30 py-10">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <Card className="border-0 shadow-elegant">
            <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <UserCircle className="h-10 w-10 text-primary" />
                <div>
                  <CardTitle className="text-2xl">สวัสดี, {profile?.name ?? "ผู้ใช้งาน"}</CardTitle>
                  <p className="text-sm text-muted-foreground">{profile?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <BookOpenCheck className="h-4 w-4 text-primary" />
                  กำลังยืม {loans.filter((loan) => loan.status === "active").length}
                </span>
                <span className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-destructive" />
                  คืนแล้ว {loans.filter((loan) => loan.status === "returned").length}
                </span>
              </div>
            </CardHeader>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            {itemsLoading ? (
              <Skeleton className="h-[320px] rounded-2xl" />
            ) : (
              <ItemList
                items={items}
                loading={itemsLoading}
                onBorrow={handleBorrow}
                title="อุปกรณ์ทั้งหมด"
              />
            )}

            <LoanList
              loans={loans}
              loading={loansLoading}
              title="ประวัติการยืมของฉัน"
              emptyMessage="ยังไม่เคยยืมอุปกรณ์"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
