import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("HIT the route");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/get-me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.jwtToken}`,
        },
      }
    );
    console.log({ responseInsideApi: response });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log({ data });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
