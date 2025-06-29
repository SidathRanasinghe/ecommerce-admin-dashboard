import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { name, price, images, isFeatured, isArchived, categoryId, sizeId } =
      body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!name) return new NextResponse("name is required", { status: 400 });
    if (!price) return new NextResponse("price is required", { status: 400 });
    if (!categoryId)
      return new NextResponse("category is required", { status: 400 });
    if (!sizeId) return new NextResponse("sizeId is required", { status: 400 });
    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });
    if (!images || !images.length) {
      return new NextResponse("At least one image is required", {
        status: 400,
      });
    }
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        sizeId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// GET -> {origin}/{storeId}/products
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });
    const where: any = {
      storeId: params.storeId,
      isArchived: false,
    };
    if (categoryId) where.categoryId = categoryId;
    if (sizeId) where.sizeId = sizeId;
    if (isFeatured) where.isFeatured = true;

    const products = await prismadb.product.findMany({
      where,
      include: {
        images: true,
        category: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
