import { Fragment } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Item } from "@/types/firebase";
import { Package, Pencil, Trash2 } from "lucide-react";

interface ItemListProps {
  items: Item[];
  loading?: boolean;
  title?: string;
  emptyMessage?: string;
  onBorrow?: (item: Item) => void;
  onEdit?: (item: Item) => void;
  onDelete?: (item: Item) => void;
  disableBorrow?: boolean;
}

const statusVariant: Record<Item["status"], "default" | "secondary"> = {
  available: "default",
  borrowed: "secondary"
};

const ItemList = ({
  items,
  loading = false,
  title = "รายการอุปกรณ์",
  emptyMessage = "ยังไม่มีอุปกรณ์ในระบบ",
  onBorrow,
  onEdit,
  onDelete,
  disableBorrow = false
}: ItemListProps) => {
  return (
    <Card className="border-0 shadow-elegant">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3).keys()].map((key) => (
              <Skeleton key={key} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">{emptyMessage}</p>
        ) : (
          items.map((item) => (
            <Fragment key={item.id}>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-4 bg-muted/50 rounded-xl">
                <div>
                  <p className="text-base font-medium text-foreground">{item.name}</p>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  )}
                  <Badge variant={statusVariant[item.status]} className="mt-3">
                    {item.status === "available" ? "พร้อมให้ยืม" : "ถูกยืมอยู่"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 self-end md:self-auto">
                  {onBorrow && (
                    <Button
                      size="sm"
                      disabled={item.status !== "available" || disableBorrow}
                      onClick={() => onBorrow(item)}
                    >
                      ยืมอุปกรณ์
                    </Button>
                  )}
                  {onEdit && (
                    <Button variant="outline" size="icon" onClick={() => onEdit(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                  {onDelete && (
                    <Button variant="ghost" size="icon" onClick={() => onDelete(item)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Fragment>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default ItemList;
