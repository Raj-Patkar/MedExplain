import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/getCurrentUser";

import {
  getUserAnalyses,
} from "@/services/analysisService";

export async function GET() {
  const user =
    await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      {
        error:
          "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const analyses =
    await getUserAnalyses(
      user.userId
    );

  return NextResponse.json(
    analyses
  );
}