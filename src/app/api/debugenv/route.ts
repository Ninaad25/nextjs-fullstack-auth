import { NextResponse } from "next/server";

export async function GET() {
  console.log("=== Environment Debug Info ===");
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
  console.log("MONGO_URI length:", process.env.MONGO_URI?.length);
  console.log(
    "All MONGO vars:",
    Object.keys(process.env).filter((key) =>
      key.toLowerCase().includes("mongo")
    )
  );

  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    mongoUriExists: !!process.env.MONGO_URI,
    mongoUriLength: process.env.MONGO_URI?.length || 0,
  });
}
