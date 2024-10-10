import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
  });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  console.log({ jwt: token.jwtToken });

  return NextResponse.json({ jwt: token.jwtToken });
}
