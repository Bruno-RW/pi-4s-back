import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    type: string;
    name: string;
  }

  interface Session {
    user: User & {
      type: string;
      name: string;
    };
    token: {
      type: string;
      name: string;
    };
  }
}