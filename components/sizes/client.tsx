"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "../common/Heading";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { DataTable } from "../common/dataTable";
import ApiList from "../ApiList";

import { SizeColumn, Columns } from "./Columns";

interface SizeClientProps {
  data: SizeColumn[];
}

const SizeClient = ({ data }: SizeClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Heading
          title={`Sizes (${data?.length})`}
          description="Manage sizes for your category"
        />
        <Button onClick={() => router.push(`/${params?.storeId}/sizes/new`)}>
          <Plus className="mr-4 size-4" />
          <span>create</span>
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={Columns} data={data} />
      <Heading title="API" description="API calls for sizes" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};

export default SizeClient;
