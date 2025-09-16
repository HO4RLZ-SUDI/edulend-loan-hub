import type { Timestamp } from "firebase/firestore";

export type UserRole = "student" | "admin";

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  photoURL?: string | null;
  role: UserRole;
}

export type ItemStatus = "available" | "borrowed";

export interface Item {
  id: string;
  name: string;
  description?: string;
  status: ItemStatus;
}

export type LoanStatus = "active" | "returned";

export interface Loan {
  id: string;
  userId: string;
  itemId: string;
  startDate: Timestamp | null;
  dueDate: Timestamp | null;
  status: LoanStatus;
  userName?: string;
  userEmail?: string;
  itemName?: string;
  returnDate?: Timestamp | null;
}
