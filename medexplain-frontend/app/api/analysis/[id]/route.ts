import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/getCurrentUser";

import {
  getAnalysisById,
} from "@/services/analysisService";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
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

  const { id } =
    await params;

  const analysis =
    await getAnalysisById(
      id,
      user.userId
    );

  return NextResponse.json(
    analysis
  );
}