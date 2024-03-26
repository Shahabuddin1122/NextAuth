import NextAuth, {Awaitable, NextAuthOptions, RequestInternal, User} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
export const authOption:NextAuthOptions = {
    secret:process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Username", type: "text", placeholder: "Enter your Email" },
                password: { label: "Password", type: "password", placeholder:"Enter password"}
            },
            async authorize(credentials, req) {
                const res = await fetch("http://localhost:8080/api/v1/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                if (res.ok && user) {
                    console.log(user)
                    return user
                }
                return null
            }
        }),
        GoogleProvider({
            clientId:"919818956531-sbs38l9brim2dd8tn32ocrpokq25oahf.apps.googleusercontent.com",
            clientSecret:"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"
        })

    ],
    callbacks: {
        async jwt({token, user}) {
            return {...token, ...user}
        },
        async session({session, token, user}) {
            session.user = token;
            // session.user.user.role = user;
            return session;
        },
        async signIn({profile}){
            console.log(profile)
            return true;
        }

    },
    session: {
        strategy: "jwt",
        maxAge: 120000 //in seconds
    },
    pages: {
        signIn: '/login',
        error: '/login'
    }
};

const handler = NextAuth(authOption)

export { handler as GET, handler as POST }