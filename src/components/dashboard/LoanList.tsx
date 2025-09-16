import { format } from "date-fns";
import { th } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Loan } from "@/types/firebase";
import { CheckCircle, ClipboardList } from "lucide-react";

interface LoanListProps {
  loans: Loan[];
  loading?: boolean;
  title?: string;
  emptyMessage?: string;
  onMarkReturned?: (loan: Loan) => void;
  onMarkActive?: (loan: Loan) => void;
  isAdmin?: boolean;
}

const statusVariant: Record<Loan["status"], "default" | "secondary" | "destructive"> = {
  active: "secondary",
  returned: "default"
};

const LoanList = ({
  loans,
  loading = false,
  title = "ประวัติการยืม",
  emptyMessage = "ยังไม่มีรายการยืม",
  onMarkReturned,
  onMarkActive,
  isAdmin = false
}: LoanListProps) => {
  const formatDate = (date: Loan["dueDate" | "startDate" | "returnDate"]) => {
    if (!date) return "-";
    return format(date.toDate(), "dd MMM yyyy", { locale: th });
  };

  return (
    <Card className="border-0 shadow-elegant">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-primary" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3).keys()].map((key) => (
              <Skeleton key={key} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        ) : loans.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">{emptyMessage}</p>
        ) : (
          loans.map((loan) => (
            <div key={loan.id} className="p-4 bg-muted/50 rounded-xl space-y-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <p className="text-base font-medium text-foreground">{loan.itemName ?? loan.itemId}</p>
                  <Badge variant={statusVariant[loan.status]} className="mt-2">
                    {loan.status === "active" ? "กำลังยืม" : "คืนแล้ว"}
                  </Badge>
                </div>
                {isAdmin && (
                  <div className="text-sm text-muted-foreground text-right">
                    <p>ผู้ยืม: {loan.userName ?? loan.userId}</p>
                    {loan.userEmail && <p className="text-xs">{loan.userEmail}</p>}
                  </div>
                )}
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <p>วันที่เริ่มยืม: {formatDate(loan.startDate)}</p>
                <p>กำหนดคืน: {formatDate(loan.dueDate)}</p>
                <p>คืนจริง: {formatDate(loan.returnDate)}</p>
              </div>
              {isAdmin && (
                <div className="flex items-center gap-2 justify-end">
                  {loan.status === "returned" ? (
                    onMarkActive && (
                      <Button variant="outline" size="sm" onClick={() => onMarkActive(loan)}>
                        ทำให้เป็นสถานะยืมอีกครั้ง
                      </Button>
                    )
                  ) : (
                    onMarkReturned && (
                      <Button size="sm" onClick={() => onMarkReturned(loan)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        บันทึกการคืน
                      </Button>
                    )
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default LoanList;
