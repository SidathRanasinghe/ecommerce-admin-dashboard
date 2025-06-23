import Heading from "../common/Heading";
import { Separator } from "../ui/separator";
import { DataTable } from "../common/dataTable";

import { OrderColumn, Columns } from "./Columns";

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
