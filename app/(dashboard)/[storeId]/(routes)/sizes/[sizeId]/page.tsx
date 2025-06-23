import React from "react";

import SizeForm from "@/components/SizeForm";
import prismadb from "@/lib/prismadb";

interface SizePageProps {
  params: Promise<{ sizeId: string }>;
}

const SizePage = async ({ params }: SizePageProps) => {
  const { sizeId } = await params;
  const sizes = await prismadb.size.findFirst({
    where: { id: sizeId },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <SizeForm initialData={sizes} />
      </div>
    </div>
  );
};

export default SizePage;
