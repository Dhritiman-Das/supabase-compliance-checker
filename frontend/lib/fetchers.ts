import { getServerSession } from "next-auth";
import { MySession, authOptions } from "./auth";
import { unstable_cache as cache } from "next/cache";

export const domain = process.env.NEXT_PUBLIC_DOMAIN || "localhost";

export async function getUserDetails(): Promise<any> {
  const session = (await getServerSession(authOptions)) as MySession | null;

  if (!session || !session.jwtToken) {
    throw new Error("No valid session found");
  }

  return cache(
    async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/get-me`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.jwtToken}`,
            "Cache-Control": "no-cache",
          },
        }
      );

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      const user = await response.json();
      return user;
    },
    [`${domain}-user-own`],
    {
      revalidate: 60,
      tags: [`${domain}-user-own`],
    }
  )();
}

// export async function getUserComplianceDetails(): Promise<any> {
//   const session = (await getServerSession(authOptions)) as MySession | null;

//   if (!session || !session.jwtToken) {
//     throw new Error("No valid session found");
//   }

//   return cache(
//     async () => {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/compliance/check-status`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${session.jwtToken}`,
//             "Cache-Control": "no-cache",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const userCompliance = await response.json();
//       return userCompliance;
//     },
//     [`${domain}-user-supabase-config`],
//     {
//       revalidate: 60,
//       tags: [`${domain}-user-supabase-config`],
//     }
//   );
// }
