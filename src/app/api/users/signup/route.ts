import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    console.log("POST request received at /api/users/signup");

    // Ensure database connection
    await connect();
    console.log("Database connection established!");
    

    // Parse request body
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log("Request body parsed:", {
      username,
      email,
      password: "***hidden***",
    });

    // Validate required fields
    if (!username || !email || !password) {
      console.log("Validation failed: Missing required fields");
      
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log("Checking if user exists with email:", email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists with email:", email);
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    console.log("Hashing password...");
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    console.log("Creating new user...");
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log("User saved successfully:", savedUser._id);

    // Remove password from response
    const { password: _, ...userResponse } = savedUser.toObject();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      user: userResponse,
    });
  } catch (error: any) {
    console.error("Error in signup API:", error);
    console.error("Error stack:", error.stack);

    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}

