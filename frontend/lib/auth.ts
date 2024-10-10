// /auth.ts
import { NextAuthOptions, Session, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./db";
import { signJwtAccessToken } from "./jwt";

export interface MySession extends Session {
  jwtToken: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          verified: Boolean(profile.emailVerified),
        };
      },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      const email = user?.email || profile?.email;
      if (!!!email) {
        throw new Error(
          "The email associated with your authentication account was not found. Please ensure you have a verified email in your authentication account."
        );
      }
      return true;
    },
    jwt: async ({ token, account, user }) => {
      const { sub, email } = token;
      if (!sub || !email) {
        throw new Error(
          "Error logging in. Please contact support if this issue persists."
        );
      }
      const jwtToken = signJwtAccessToken({ sub, email });
      token.jwtToken = jwtToken;
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        // @ts-expect-error
        id: token.sub,
        // @ts-expect-error
        username: token?.user?.username || token?.user?.gh_username,
      };
      // @ts-expect-error
      session.jwtToken = token.jwtToken;
      return session;
    },
  },
  debug: true,
  logger: {
    error(code, metadata) {
      console.log(code, metadata);
    },
    warn(code) {
      console.log(code);
    },
    debug(code, metadata) {
      console.log(code, metadata);
    },
  },
  // @ts-ignore
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    error: "/auth/error",
    signIn: "/",
    signOut: "/auth/signout",
    verifyRequest: "/auth/verify-request",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export function getSession() {
  return getServerSession(authOptions) as Promise<{
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      image: string;
    };
  } | null>;
}

export function withAuth(action: any) {
  return async (formData: FormData) => {
    const session = await getSession();
    if (!session) {
      return {
        error: "Not authenticated",
      };
    }
    return action(formData);
  };
}
