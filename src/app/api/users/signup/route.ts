import { connect } from '@/libs/mongodb'
import User from '@/modes/user'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    await connect()
    const reqBody = await request.json()
    const { username, email, password } = reqBody
    console.log(reqBody)

    // Check if the email is already
    const user = await User.findOne({ email })

    if (user) {
      return NextResponse.json(
        { message: 'user already exists.' },
        { status: 400 }
      )
    }

    //hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    const saveUser = await newUser.save()
    console.log(saveUser)

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      saveUser,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
