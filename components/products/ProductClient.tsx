"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "../common/Heading";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { DataTable } from "../common/DataTable";
import ApiList from "../ApiList";

import { Columns } from "./Columns";
import { ProductColumn } from "./types";

interface ProductClientProps {
  data: ProductColumn[];
}

const ProductClient = ({ data }: ProductClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Heading
          title={`Products (${data?.length})`}
          description="Manage products for your store"
        />
        <Button onClick={() => router.push(`/${params?.storeId}/products/new`)}>
          <Plus className="mr-4 size-4" />
          <span>create</span>
        </Button>
      </div>
      <div className="w-full">
        <Separator />
        <DataTable searchKey="name" columns={Columns} data={data} />
        <Heading title="API" description="API calls for products" />
        <Separator />
        <ApiList entityName="products" entityIdName="productId" />
      </div>
    </>
  );
};

export default ProductClient;
