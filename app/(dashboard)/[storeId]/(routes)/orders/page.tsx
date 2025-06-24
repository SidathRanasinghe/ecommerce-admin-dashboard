import { format } from "date-fns";

import { OrderColumn } from "@/components/orders/types";
import OrderClient from "@/components/orders/OrderClient";
import prismadb from "@/lib/prismadb";

interface OrdersPageProps {
  params: Promise<{ storeId: string }>;
}

const OrdersPage = async ({ params }: OrdersPageProps) => {
  const { storeId } = await params;
  const orders = await prismadb.order.findMany({
    where: { storeId },
    include: { orderItems: { include: { product: true } } },
    take: 20,
    orderBy: { createdAt: "desc" },
  });

  const formattedOrders: OrderColumn[] = orders.map(order => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    isPaid: order.isPaid,
    products: order.orderItems
      .map(orderItem => orderItem.product.name)
      .join(", "),
    totalPrice: order.orderItems.reduce(
      (acc, orderItem) => acc + orderItem.product.price,
      0
    ),
    createdAt: format(order.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
