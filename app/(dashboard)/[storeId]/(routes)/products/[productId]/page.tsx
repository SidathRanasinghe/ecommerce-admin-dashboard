import ProductForm from "@/components/ProductForm";
import prismadb from "@/lib/prismadb";

interface ProductPageProps {
  params: Promise<{ productId: string; storeId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId, storeId } = await params;
  const product = await prismadb.product.findFirst({
    where: { id: productId },
    include: { images: true },
  });

  const categories = await prismadb.category.findMany({
    where: { storeId },
  });
  const sizes = await prismadb.size.findMany({
    where: { storeId },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <ProductForm
          initialData={product}
          categories={categories}
          sizes={sizes}
        />
      </div>
    </div>
  );
};

export default ProductPage;
