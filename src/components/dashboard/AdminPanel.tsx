import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import ItemList from "@/components/dashboard/ItemList";
import LoanList from "@/components/dashboard/LoanList";
import type { Item, ItemStatus, Loan, LoanStatus } from "@/types/firebase";
import { Loader2, PackagePlus, Save, Trash2 } from "lucide-react";

interface AdminPanelProps {
  items: Item[];
  loans: Loan[];
  itemsLoading: boolean;
  loansLoading: boolean;
  onCreateItem: (payload: { name: string; description?: string }) => Promise<void>;
  onUpdateItem: (id: string, updates: Partial<Omit<Item, "id">>) => Promise<void>;
  onDeleteItem: (id: string) => Promise<void>;
  onUpdateLoanStatus: (loan: Loan, status: LoanStatus) => Promise<void>;
}

const AdminPanel = ({
  items,
  loans,
  itemsLoading,
  loansLoading,
  onCreateItem,
  onUpdateItem,
  onDeleteItem,
  onUpdateLoanStatus
}: AdminPanelProps) => {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [editItemStatus, setEditItemStatus] = useState<ItemStatus>("available");
  const [isSavingItem, setIsSavingItem] = useState(false);

  const borrowedCount = useMemo(
    () => items.filter((item) => item.status === "borrowed").length,
    [items]
  );

  const handleCreateItem = async () => {
    if (!newItemName.trim()) {
      toast({ title: "กรุณากรอกชื่ออุปกรณ์", variant: "destructive" });
      return;
    }
    setIsCreating(true);
    try {
      await onCreateItem({ name: newItemName.trim(), description: newItemDescription.trim() });
      setNewItemName("");
      setNewItemDescription("");
      toast({ title: "เพิ่มอุปกรณ์สำเร็จ" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "ไม่สามารถเพิ่มอุปกรณ์ได้";
      toast({ title: "เกิดข้อผิดพลาด", description: message, variant: "destructive" });
    } finally {
      setIsCreating(false);
    }
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    setEditItemStatus(item.status);
  };

  const handleSaveItem = async () => {
    if (!editingItem) return;
    setIsSavingItem(true);
    try {
      await onUpdateItem(editingItem.id, {
        name: editingItem.name,
        description: editingItem.description,
        status: editItemStatus
      });
      toast({ title: "บันทึกข้อมูลอุปกรณ์แล้ว" });
      setEditingItem(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "ไม่สามารถบันทึกข้อมูลได้";
      toast({ title: "เกิดข้อผิดพลาด", description: message, variant: "destructive" });
    } finally {
      setIsSavingItem(false);
    }
  };

  const handleDeleteItem = async (item: Item) => {
    try {
      await onDeleteItem(item.id);
      toast({ title: "ลบอุปกรณ์แล้ว" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "ไม่สามารถลบอุปกรณ์ได้";
      toast({ title: "เกิดข้อผิดพลาด", description: message, variant: "destructive" });
    }
  };

  const handleUpdateLoanStatus = async (loan: Loan, status: LoanStatus) => {
    try {
      await onUpdateLoanStatus(loan, status);
      toast({ title: status === "returned" ? "บันทึกการคืนแล้ว" : "อัปเดตสถานะแล้ว" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "ไม่สามารถอัปเดตสถานะได้";
      toast({ title: "เกิดข้อผิดพลาด", description: message, variant: "destructive" });
    }
  };

  return (
    <Tabs defaultValue="items" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="items">จัดการอุปกรณ์</TabsTrigger>
        <TabsTrigger value="loans">จัดการการยืม</TabsTrigger>
      </TabsList>

      <TabsContent value="items" className="space-y-6">
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <CardTitle>เพิ่มอุปกรณ์ใหม่</CardTitle>
              <div className="text-sm text-muted-foreground">
                กำลังถูกยืม {borrowedCount} / {items.length}
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
            <div className="space-y-2">
              <Label htmlFor="item-name">ชื่ออุปกรณ์</Label>
              <Input
                id="item-name"
                placeholder="เช่น Notebook Dell Latitude"
                value={newItemName}
                onChange={(event) => setNewItemName(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-description">รายละเอียด</Label>
              <Input
                id="item-description"
                placeholder="สภาพ, หมายเลขครุภัณฑ์ หรือข้อมูลอื่น ๆ"
                value={newItemDescription}
                onChange={(event) => setNewItemDescription(event.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleCreateItem} disabled={isCreating} className="w-full md:w-auto">
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    กำลังบันทึก
                  </>
                ) : (
                  <>
                    <PackagePlus className="mr-2 h-4 w-4" />
                    เพิ่มอุปกรณ์
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <ItemList
          items={items}
          loading={itemsLoading}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
          disableBorrow
        />
      </TabsContent>

      <TabsContent value="loans">
        <LoanList
          loans={loans}
          loading={loansLoading}
          onMarkReturned={(loan) => handleUpdateLoanStatus(loan, "returned")}
          onMarkActive={(loan) => handleUpdateLoanStatus(loan, "active")}
          isAdmin
        />
      </TabsContent>

      <Dialog open={Boolean(editingItem)} onOpenChange={(open) => !open && setEditingItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>แก้ไขข้อมูลอุปกรณ์</DialogTitle>
            <DialogDescription>ปรับปรุงชื่อ รายละเอียด หรือสถานะอุปกรณ์</DialogDescription>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">ชื่ออุปกรณ์</Label>
                <Input
                  id="edit-name"
                  value={editingItem.name}
                  onChange={(event) => setEditingItem({ ...editingItem, name: event.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">รายละเอียด</Label>
                <Input
                  id="edit-description"
                  value={editingItem.description ?? ""}
                  onChange={(event) =>
                    setEditingItem({ ...editingItem, description: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>สถานะ</Label>
                <Select value={editItemStatus} onValueChange={(value: ItemStatus) => setEditItemStatus(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">พร้อมให้ยืม</SelectItem>
                    <SelectItem value="borrowed">ถูกยืมอยู่</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-between">
            <Button
              variant="ghost"
              onClick={() => {
                if (!editingItem) return;
                handleDeleteItem(editingItem);
                setEditingItem(null);
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" /> ลบอุปกรณ์
            </Button>
            <Button onClick={handleSaveItem} disabled={isSavingItem}>
              {isSavingItem ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  กำลังบันทึก
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  บันทึกการเปลี่ยนแปลง
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Tabs>
  );
};

export default AdminPanel;
