import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    return NextResponse.json(
      { message: "Database connected successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message }, 
      { status: 500 });
  }
}
