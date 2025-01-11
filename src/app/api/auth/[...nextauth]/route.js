import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../libs/prisma";
import bcrypt from "bcrypt";

const AUTH_OPTIONS = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text", placeholder: "Phone" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials) {
        console.log("credentials", credentials);

        // Validar que los datos necesarios están presentes
        if (!credentials?.phone || !credentials?.password) {
          throw new Error("Phone and password are required");
        }

        const user = await prisma.user.findUnique({
          where: {
            phone: credentials.phone,
          },
        });

        console.log("user", user);

        if (!user) {
          throw new Error("User not found");
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password);

        if (!passwordMatch) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          phone: user.phone,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",  // Página de inicio de sesión
    signOut: "/auth/login", // Página de cierre de sesión
    error: "/auth/error",   // Página personalizada de error
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/gallery`; // Redirigir al usuario a la página /gallery después del login
    },
  },
  secret: process.env.NEXTAUTH_SECRET,  // Asegúrate de que NEXTAUTH_SECRET esté configurado en .env
};

const handler = NextAuth(AUTH_OPTIONS);

export { handler as GET, handler as POST };
