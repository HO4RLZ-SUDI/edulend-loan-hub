import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where
} from "firebase/firestore";
import { firestore } from "@/firebase";
import type { AppUser, Item, Loan, LoanStatus } from "@/types/firebase";

interface UseLoansOptions {
  userId?: string;
  enabled?: boolean;
  isAdmin?: boolean;
}

interface UseLoansResult {
  loans: Loan[];
  loading: boolean;
  error: Error | null;
  borrowItem: (payload: { item: Item; user: AppUser; dueDate: Date }) => Promise<void>;
  updateLoanStatus: (loan: Loan, status: LoanStatus) => Promise<void>;
}

const useLoans = ({ userId, enabled = true, isAdmin = false }: UseLoansOptions): UseLoansResult => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return undefined;
    }

    if (!isAdmin && !userId) {
      setLoans([]);
      setLoading(false);
      return undefined;
    }

    const baseQuery = collection(firestore, "loans");
    const loansQuery = isAdmin
      ? query(baseQuery, orderBy("startDate", "desc"))
      : query(baseQuery, where("userId", "==", userId), orderBy("startDate", "desc"));

    const unsubscribe = onSnapshot(
      loansQuery,
      (snapshot) => {
        const nextLoans = snapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...(docSnapshot.data() as Omit<Loan, "id">)
        }));
        setLoans(nextLoans);
        setLoading(false);
      },
      (loansError) => {
        setError(loansError as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [enabled, isAdmin, userId]);

  const borrowItem = useCallback(
    async ({ item, user, dueDate }: { item: Item; user: AppUser; dueDate: Date }) => {
      const loanRef = collection(firestore, "loans");
      await addDoc(loanRef, {
        userId: user.uid,
        userName: user.name,
        userEmail: user.email,
        itemId: item.id,
        itemName: item.name,
        startDate: serverTimestamp(),
        dueDate: Timestamp.fromDate(dueDate),
        status: "active" satisfies LoanStatus
      });

      const itemRef = doc(firestore, "items", item.id);
      await updateDoc(itemRef, { status: "borrowed" });
    },
    []
  );

  const updateLoanStatus = useCallback(async (loan: Loan, status: LoanStatus) => {
    const loanRef = doc(firestore, "loans", loan.id);
    const updates: Record<string, unknown> = {
      status,
      updatedAt: serverTimestamp()
    };

    if (status === "returned") {
      updates.returnDate = serverTimestamp();
      const itemRef = doc(firestore, "items", loan.itemId);
      await updateDoc(itemRef, { status: "available" });
    }

    if (status === "active") {
      updates.returnDate = null;
      const itemRef = doc(firestore, "items", loan.itemId);
      await updateDoc(itemRef, { status: "borrowed" });
    }

    await updateDoc(loanRef, updates);
  }, []);

  return useMemo(
    () => ({ loans, loading, error, borrowItem, updateLoanStatus }),
    [borrowItem, error, loans, loading, updateLoanStatus]
  );
};

export default useLoans;
