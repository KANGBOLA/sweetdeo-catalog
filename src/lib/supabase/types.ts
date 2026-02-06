export type OrderStatus =
  | "pending"
  | "paid"
  | "confirmed"
  | "shipping"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  total_amount: number;
  status: OrderStatus;
  payment_key: string | null;
  payment_method: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  subtotal: number;
}

export interface CreateOrderInput {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: {
    product_id: number;
    product_name: string;
    product_price: number;
    quantity: number;
  }[];
}
