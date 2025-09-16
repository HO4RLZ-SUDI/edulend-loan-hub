import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc
} from "firebase/firestore";
import { firestore } from "@/firebase";
import type { Item, ItemStatus } from "@/types/firebase";

interface UseItemsResult {
  items: Item[];
  loading: boolean;
  error: Error | null;
  addItem: (payload: { name: string; description?: string }) => Promise<void>;
  updateItem: (id: string, updates: Partial<Omit<Item, "id">>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  setItemStatus: (id: string, status: ItemStatus) => Promise<void>;
}

const useItems = (enabled = true): UseItemsResult => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return undefined;
    }

    const itemsQuery = query(collection(firestore, "items"), orderBy("name"));

    const unsubscribe = onSnapshot(
      itemsQuery,
      (snapshot) => {
        const nextItems = snapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...(docSnapshot.data() as Omit<Item, "id">)
        }));
        setItems(nextItems);
        setLoading(false);
      },
      (itemsError) => {
        setError(itemsError as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [enabled]);

  const addItem = useCallback(async ({ name, description }: { name: string; description?: string }) => {
    await addDoc(collection(firestore, "items"), {
      name,
      description: description ?? "",
      status: "available" satisfies ItemStatus,
      createdAt: new Date().toISOString()
    });
  }, []);

  const updateItem = useCallback(async (id: string, updates: Partial<Omit<Item, "id">>) => {
    const itemRef = doc(firestore, "items", id);
    await updateDoc(itemRef, updates);
  }, []);

  const deleteItem = useCallback(async (id: string) => {
    const itemRef = doc(firestore, "items", id);
    await deleteDoc(itemRef);
  }, []);

  const setItemStatus = useCallback(async (id: string, status: ItemStatus) => {
    await updateItem(id, { status });
  }, [updateItem]);

  return useMemo(
    () => ({
      items,
      loading,
      error,
      addItem,
      updateItem,
      deleteItem,
      setItemStatus
    }),
    [items, loading, error, addItem, updateItem, deleteItem, setItemStatus]
  );
};

export default useItems;
