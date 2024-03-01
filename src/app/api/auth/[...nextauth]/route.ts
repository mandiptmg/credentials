import { connect } from '@/libs/mongodb'
import User, { UserDocument } from '@/modes/user'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { NextApiHandler } from 'next'

// Define types for credentials
interface Credentials {
  email: string
  password: string
}

// Define the authorization function type
type AuthorizeFunction = (
  credentials: Credentials
) => Promise<UserDocument | null>

// Define the options for NextAuth
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      // Define the authorize function
      authorize: async (credentials: Credentials) => {
        const { email, password } = credentials

        try {
          await connect() // Connect to MongoDB
          const user = await User.findOne({ email })

          if (!user) {
            return null
          }

          const passwordMatch = await bcrypt.compare(password, user.password)
          if (!passwordMatch) {
            return null
          }
          return user
        } catch (error) {
          console.error('Error: ', error)
          return null // Return null in case of error
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET!, // Ensure that NEXTAUTH_SECRET is defined
  pages: {
    signIn: '/', // Define the sign-in page
  },
}

// Define the handler as a NextApiHandler
const handler: NextApiHandler = NextAuth(authOptions)

export { handler as GET, handler as POST }
