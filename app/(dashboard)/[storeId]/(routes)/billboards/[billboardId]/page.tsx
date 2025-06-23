import BillboardForm from "@/components/BillboardForm";
import prismadb from "@/lib/prismadb";

interface BillboardPageProps {
  params: Promise<{ billboardId: string }>;
}

const BillboardPage = async ({ params }: BillboardPageProps) => {
  const { billboardId } = await params;
  const billboard = await prismadb.billboard.findFirst({
    where: { id: billboardId },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
