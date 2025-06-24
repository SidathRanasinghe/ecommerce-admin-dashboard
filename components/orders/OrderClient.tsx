import Heading from "../common/Heading";
import { Separator } from "../ui/separator";
import { DataTable } from "../common/DataTable";

import { Columns } from "./Columns";
import { OrderColumn } from "./types";

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient = ({ data }: OrderClientProps) => {
  return (
    <>
      <Heading
        title={`Orders (${data?.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable searchKey="products" columns={Columns} data={data} />
    </>
  );
};

export default OrderClient;
