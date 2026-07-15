import axios from "axios";

const PRODUCT_API = "https://localhost:7249/api/Product";
const ORDER_API = "https://localhost:7249/api/Order";

export const getDashboardData = async () => {

    const [productsRes, ordersRes] = await Promise.all([
        axios.get(PRODUCT_API),
        axios.get(ORDER_API)
    ]);

    const products = productsRes.data;
    const orders = ordersRes.data;

    const revenue = orders.reduce(
        (sum, order) => sum + order.totalAmount,
        0
    );

    const pending = orders.filter(
        o => o.status === "Pending"
    ).length;

    const preparing = orders.filter(
        o => o.status === "Preparing"
    ).length;

    const delivered = orders.filter(
        o => o.status === "Delivered"
    ).length;

    const cancelled = orders.filter(
        o => o.status === "Cancelled"
    ).length;

    const outForDelivery = orders.filter(
        o => o.status === "Out for Delivery"
    ).length;

    return {
        products: products.length,
        orders: orders.length,
        revenue,
        pending,
        preparing,
        delivered,
        cancelled,
        outForDelivery,
        recentOrders: orders.slice(0, 5)
    };
};