import { format } from "date-fns";

import { ProductColumn } from "@/components/products/types";
import ProductClient from "@/components/products/ProductClient";
import prismadb from "@/lib/prismadb";

interface ProductsPageProps {
  params: Promise<{ storeId: string }>;
}

const ProductsPage = async ({ params }: ProductsPageProps) => {
  const { storeId } = await params;
  const products = await prismadb.product.findMany({
    where: { storeId },
    include: { category: true, size: true },
    orderBy: { createdAt: "desc" },
  });

  const formattedProducts: ProductColumn[] = products.map(product => ({
    id: product.id,
    name: product.name,
    isArchived: product.isArchived,
    isFeatured: product.isFeatured,
    price: product.price,
    category: product.category.name,
    size: product.size.name,
    createdAt: format(product.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
