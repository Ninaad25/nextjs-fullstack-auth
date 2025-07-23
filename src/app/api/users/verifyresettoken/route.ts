import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("POST request received at /api/users/verifyresettoken");

    // Ensure database connection
    await connect();
    console.log("Database connection established!");

    // Parse request body
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log("Request body parsed:", { token: "***hidden***" });

    // Validate required field
    if (!token) {
      console.log("Validation failed: Token is required");
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Find user with valid reset token
    console.log("Checking for valid reset token...");
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      console.log("Invalid or expired reset token");
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    console.log("Valid reset token found for user:", user._id);

    return NextResponse.json({
      message: "Valid reset token",
      success: true,
    });
  } catch (error: any) {
    console.error("Error in verify reset token API:", error);
    console.error("Error stack:", error.stack);

    return NextResponse.json(
      { error: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}
