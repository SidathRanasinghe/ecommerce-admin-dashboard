import { format } from "date-fns";

import { SizeColumn } from "@/components/sizes/types";
import SizeClient from "@/components/sizes/SizeClient";
import prismadb from "@/lib/prismadb";

interface SizesPageProps {
  params: Promise<{ storeId: string }>;
}

const SizesPage = async ({ params }: SizesPageProps) => {
  const { storeId } = await params;
  const sizes = await prismadb.size.findMany({
    where: { storeId },
    orderBy: { createdAt: "desc" },
  });

  const formattedBillboards: SizeColumn[] = sizes.map(size => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(size.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default SizesPage;
