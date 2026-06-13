 import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(
  request: NextRequest
) {
  try {
    const token =
      request.cookies.get(
        "medexplain_token"
      )?.value;

    if (!token) {
      return NextResponse.json(
        {
          authenticated: false,
        },
        {
          status: 401,
        }
      );
    }

    const user =
      verifyToken(token);

    return NextResponse.json({
      authenticated: true,
      user,
    });
  } catch {
    return NextResponse.json(
      {
        authenticated: false,
      },
      {
        status: 401,
      }
    );
  }
}