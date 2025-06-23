import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import SettingsForm from "@/components/SettingsForm";
import prismadb from "@/lib/prismadb";

interface SettingPageProps {
  params: Promise<{ storeId: string }>;
}

const SettingPage = async ({ params }: SettingPageProps) => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { storeId } = await params;

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });
  if (!store) redirect("/");
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingPage;
