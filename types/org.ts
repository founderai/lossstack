export interface Organization {
  id: string;
  name: string;
  owner_id: string; // email address — will be Clerk userId when integrated
  plan: "core" | "pro" | "firm";
  included_seats: number;
  seat_price: number; // cents per extra seat
  created_at: string;
}

export interface OrgUser {
  id: string;
  org_id: string;
  user_id: string; // email address — will be Clerk userId when integrated
  role: "owner" | "admin" | "member";
  created_at: string;
}

export interface OrgSubscription {
  id: string;
  org_id: string;
  stripe_subscription_id: string | null;
  stripe_seat_item_id: string | null;
  seat_count: number; // extra seats purchased above included
  created_at: string;
}

export interface OrgWithDetails extends Organization {
  members: OrgUser[];
  subscription: OrgSubscription | null;
  totalSeats: number;  // included + extra purchased
  usedSeats: number;   // current member count
}
