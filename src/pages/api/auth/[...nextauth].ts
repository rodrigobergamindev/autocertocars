

import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { NextApiRequest, NextApiResponse } from 'next'


const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }
    )
  ],
  pages: {
    signIn: "/login",
    error: '/login',
    signOut: '/'
  },
  callbacks: {
    async signIn(user, account, profile) {
      if (account.provider === 'google' &&
          profile.email === process.env.EMAIL_ADM) {
        return true
      } else {
        return false
      }
    },
  }
}


export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)