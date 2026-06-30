import { api } from "@/features/api interface/axios.interface";

export interface UserData {
    id: string;
    fullName: string;
    email: string;
    phone: string;
}

export interface SellerData {
    id: string;
    businessName: string;
    city: string;
}

export interface ProductImage {
    id: string;
    publicUrl: string;
}

export interface ProductData {
    id: string;
    title: string;
    price: string | number;
    category: string;
    images: ProductImage[];
}

export interface OrderItem {
    id: string;
    quantity: number;
    price: string | number;
    product: ProductData;
}

export interface AdminOrder {
    id: string;
    orderNumber: string;
    status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED';
    paymentStatus: string;
    totalAmount: string | number;
    shippingAddress: string;
    phoneNumber: string;
    createdAt: string;
    buyer: UserData;
    seller: SellerData;
    items: OrderItem[];
}

export interface OrdersApiResponse {
    success: boolean;
    message: string;
    data: {
        orders: AdminOrder[];
        totalCount: number;
    };
}

export const getAdminOrders = async (page: number, limit: number, status: string): Promise<OrdersApiResponse> => {
    const response = await api.get(`/admin/all/orders?page=${page}&limit=${limit}&status=${status}`);
    return response.data;
};