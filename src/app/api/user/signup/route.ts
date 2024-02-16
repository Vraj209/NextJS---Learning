import dbConnect from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

dbConnect()

export async function POST(request: NextRequest) {
    try {
        // get the user data from the body
        const reqBody = await request.json()
        const { username, email, password } = reqBody
        console.log(reqBody)

        // check user exists
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({
                error: "User already exists"
            }, { status: 400 })
        }

        // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // create new user
        const newUser = new User({
            username,
            email,
            password:hashedPassword,
        })
        const savedUser = await newUser.save()
        return NextResponse.json({
            message: "User created successfully ",
            savedUser,
            success: true
        }, { status: 201 })

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}