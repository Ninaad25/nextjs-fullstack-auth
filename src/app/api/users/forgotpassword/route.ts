import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/helpers/mailer";
import crypto from "crypto";

connect();

export async function POST(request: NextRequest) {
  try {
    console.log("POST request received at /api/users/forgotpassword");

    const reqBody = await request.json();
    const { email } = reqBody;
    console.log("Request body parsed:", { email });

    if (!email) {
      console.log("Validation failed: Missing email");
      return NextResponse.json(
        { error: "Email is required" }, 
        { status: 400 });
    }

    // Check if user exists
    console.log("Checking if user exists with email:", email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found with email:", email);
      return NextResponse.json(
        { error: "User with this email does not exist" },
        { status: 404 }
      );
    }

    // Generate reset token
    console.log("Generating reset token...");
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Set token and expiry (1 hour from now)
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();
    console.log("Reset token saved for user:", user._id);

    // Send password reset email
    await sendMail({
      email,
      emailType: "RESET",
      userId: user._id,
    });

    return NextResponse.json({
      message: "Password reset link sent successfully",
      success: true,
    });
  } catch (error: any) {
    console.error("Error in forgot password API:", error);
    return NextResponse.json(
      { error: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}
