import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    console.log("POST request received at /api/users/resetpassword");

    // Ensure database connection
    await connect();
    console.log("Database connection established!");

    // Parse request body
    const reqBody = await request.json();
    const { token, password } = reqBody;
    console.log("Request body parsed:", {
      token: "***hidden***",
      password: "***hidden***",
    });

    // Validate required fields
    if (!token || !password) {
      console.log("Validation failed: Token and password are required");
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      console.log("Validation failed: Password too short");
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Find user with valid reset token
    console.log("Finding user with valid reset token...");
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

    // Hash new password
    console.log("Hashing new password...");
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Update user password and clear reset token
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();
    console.log("Password updated and reset token cleared for user:", user._id);

    return NextResponse.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error: any) {
    console.error("Error in reset password API:", error);
    console.error("Error stack:", error.stack);

    return NextResponse.json(
      { error: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}
