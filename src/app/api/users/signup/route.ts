import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

connect()

// defining req
export async function POST(request: NextRequest){
    try {
       const reqBody = await request.json()
       const {username, email, password} = reqBody
       console.log(reqBody);
       
    //    check if user already exists
   const user = await User.findOne({email})
   if (user) {
    return NextResponse.json(
        {error: "User already exists"}, 
        {status: 400})
   }
   // hash pwd
   const salt = await bcryptjs.genSalt(10) // generate salt with 10 rounds
   const hashedPwd = await bcryptjs.hash(password, salt)

   const newUser = new User({
    username,
    email,
    password: hashedPwd
   })
  const savedUser = await newUser.save()
  console.log(savedUser);

  return NextResponse.json({
    message: "User saved successfully", 
    success: true,
    savedUser
    })

    } catch (error: any) {
        return NextResponse.json(
            {error: error.message}, 
            {status: 500})
    }
}

