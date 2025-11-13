
import { Accounts } from '@/collections/Account'
import { Users } from '@/collections/Users/config'
import { authPlugin } from 'payload-auth-plugin'
import {
    Auth0AuthProvider,
    GoogleAuthProvider,
    PasswordProvider,
} from 'payload-auth-plugin/providers'

export default function getAuthPlugin() {
    return authPlugin({
        enabled : true,
        name: 'admin', // must be unique
        useAdmin: true, // not mandatory, and only use this for admin
        allowOAuthAutoSignUp: true,
        usersCollectionSlug: Users.slug,
        accountsCollectionSlug: Accounts.slug,
      successRedirectPath: '/',
      errorRedirectPath: '/admin/auth',
        providers: [
            GoogleAuthProvider({
                client_id: process.env.GOOGLE_CLIENT_ID as string,
                client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
            }),
            // Auth0AuthProvider({
            //     domain: process.env.AUTH0_DOMAIN as string,
            //     client_id: process.env.AUTH0_CLIENT_ID as string,
            //     client_secret: process.env.AUTH0_CLIENT_SECRET as string,
            // }),
        ],
    })
}
