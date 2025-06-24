import { format } from "date-fns";

import { BillboardColumn } from "@/components/billboard/types";
import BillboardClient from "@/components/billboard/BillboardClient";
import prismadb from "@/lib/prismadb";

interface BillboardsPageProps {
  params: Promise<{ storeId: string }>;
}

const BillboardsPage = async ({ params }: BillboardsPageProps) => {
  const { storeId } = await params;
  const billboards = await prismadb.billboard.findMany({
    where: { storeId },
    orderBy: { createdAt: "desc" },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map(billboard => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
