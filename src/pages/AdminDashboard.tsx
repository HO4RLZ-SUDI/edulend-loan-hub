import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import AdminPanel from "@/components/dashboard/AdminPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import useItems from "@/hooks/useItems";
import useLoans from "@/hooks/useLoans";
import type { Item, Loan, LoanStatus } from "@/types/firebase";
import { ClipboardList, PackageSearch } from "lucide-react";

const AdminDashboard = () => {
  const { user, profile, loading } = useAuth();
  const { toast } = useToast();
  const {
    items,
    loading: itemsLoading,
    addItem,
    updateItem,
    deleteItem
  } = useItems(Boolean(user));
  const {
    loans,
    loading: loansLoading,
    updateLoanStatus
  } = useLoans({
    enabled: Boolean(user),
    isAdmin: true
  });

  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }

  if (!loading && profile?.role !== "admin") {
    return <Navigate to="/student-dashboard" replace />;
  }

  const handleCreateItem = async (payload: { name: string; description?: string }) => {
    try {
      await addItem(payload);
    } catch (error) {
      const message = error instanceof Error ? error.message : "ไม่สามารถเพิ่มอุปกรณ์ได้";
      toast({ title: "เกิดข้อผิดพลาด", description: message, variant: "destructive" });
      throw error;
    }
  };

  const handleUpdateItem = async (id: string, updates: Partial<Omit<Item, "id">>) => {
    try {
      await updateItem(id, updates);
    } catch (error) {
      const message = error instanceof Error ? error.message : "ไม่สามารถแก้ไขอุปกรณ์ได้";
      toast({ title: "เกิดข้อผิดพลาด", description: message, variant: "destructive" });
      throw error;
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteItem(id);
    } catch (error) {
      const message = error instanceof Error ? error.message : "ไม่สามารถลบอุปกรณ์ได้";
      toast({ title: "เกิดข้อผิดพลาด", description: message, variant: "destructive" });
      throw error;
    }
  };

  const handleUpdateLoanStatus = async (loan: Loan, status: LoanStatus) => {
    try {
      await updateLoanStatus(loan, status);
    } catch (error) {
      const message = error instanceof Error ? error.message : "ไม่สามารถอัปเดตสถานะได้";
      toast({ title: "เกิดข้อผิดพลาด", description: message, variant: "destructive" });
      throw error;
    }
  };

  return (
    <Layout>
      <div className="bg-muted/30 py-10">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <Card className="border-0 shadow-elegant">
            <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <PackageSearch className="h-10 w-10 text-primary" />
                <div>
                  <CardTitle className="text-2xl">แดชบอร์ดผู้ดูแลระบบ</CardTitle>
                  <p className="text-sm text-muted-foreground">จัดการอุปกรณ์และการยืม-คืนทั้งหมดในระบบ</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ClipboardList className="h-4 w-4" />
                อุปกรณ์ทั้งหมด {items.length} รายการ
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {profile?.email}
            </CardContent>
          </Card>

          {loading ? (
            <Skeleton className="h-[480px] rounded-2xl" />
          ) : (
            <AdminPanel
              items={items}
              loans={loans}
              itemsLoading={itemsLoading}
              loansLoading={loansLoading}
              onCreateItem={handleCreateItem}
              onUpdateItem={handleUpdateItem}
              onDeleteItem={handleDeleteItem}
              onUpdateLoanStatus={handleUpdateLoanStatus}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
