import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get(
      "medexplain_token"
    )?.value;

    if (!token) {
      return null;
    }

    const decoded =
      verifyToken(token) as JwtPayload;

    return {
      userId: decoded.userId,
      email: decoded.email,
    };
  } catch {
    return null;
  }
}