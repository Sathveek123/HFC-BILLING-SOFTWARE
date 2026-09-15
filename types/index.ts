export interface Owner {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  restaurant_name: string;
  created_at: string;
}

export interface MenuCategory {
  id: string;
  owner_id?: string;
  name: string;
  sort_order: number;
  menu_card?: string;
}

export interface MenuItem {
  id: string;
  owner_id?: string;
  category_id: string;
  menu_card?: string;
  name: string;
  price: number;
  half_price?: number | null;
  image_url?: string;
  is_available: boolean;
  stock: number;
}

export interface RawMaterial {
  id: string;
  owner_id?: string;
  name: string;
  unit: string;
  quantity: number;
  min_threshold: number;
}

export interface RestaurantTable {
  id: string;
  owner_id?: string;
  table_number: number;
  qr_code_url?: string;
  is_occupied: boolean;
}

export type OrderType = 'dine-in' | 'takeaway' | 'delivery';
export type OrderStatus = 'pending' | 'cooking' | 'served' | 'completed' | 'cancelled';
export type PaymentMethod = 'cash' | 'upi' | 'card' | 'due';

export interface OrderItem {
  id: string;
  order_id?: string;
  menu_item_id: string;
  item_name: string;
  qty: number;
  price: number;
  variant: 'full' | 'half';
}

export interface Order {
  id: string;
  owner_id?: string;
  table_id?: string | null;
  table_number?: number | null;
  order_number: string;
  type: OrderType;
  status: OrderStatus;
  payment_method: PaymentMethod;
  total: number;
  tax: number;
  discount: number;
  customer_name?: string;
  customer_phone?: string;
  created_at: string;
  items: OrderItem[];
}

export interface CashDrawerEntry {
  id: string;
  owner_id?: string;
  type: 'in' | 'out';
  amount: number;
  note: string;
  date: string;
}

export interface Expense {
  id: string;
  owner_id?: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export interface Customer {
  id: string;
  owner_id?: string;
  name: string;
  phone: string;
  total_due: number;
}

export interface Employee {
  id: string;
  owner_id?: string;
  name: string;
  role: string;
  phone: string;
  salary: number;
  joined_at: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'inventory' | 'cash' | 'system';
}
