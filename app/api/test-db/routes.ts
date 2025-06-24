import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET() {
  try {
    console.info("Testing database connection...");

    // Test database connection
    await prismadb.$connect();
    console.info("Database connected successfully");

    // Try to count stores
    const storeCount = await prismadb.store.count();
    // console.debug("Store count:", storeCount); // May not show in browser console unless “Verbose” or “Debug” is enabled in settings.
    console.info("Store count:", storeCount);

    return NextResponse.json({
      success: true,
      message: "Database connected successfully",
      storeCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  } finally {
    await prismadb.$disconnect();
  }
}
