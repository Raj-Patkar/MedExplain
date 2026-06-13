import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/getCurrentUser";

import {
  createAnalysis,
} from "@/services/analysisService";

export async function POST(
  request: Request
) {
  try {
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

    const formData =
      await request.formData();

    const reportFile =
      formData.get(
        "report_file"
      ) as File;

    const xrayFile =
      formData.get(
        "xray_file"
      ) as File;

    if (
      !reportFile ||
      !xrayFile
    ) {
      return NextResponse.json(
        {
          error:
            "Both files required",
        },
        {
          status: 400,
        }
      );
    }

    const result =
      await createAnalysis(
        reportFile,
        xrayFile,
        user.userId
      );

    return NextResponse.json(
      result
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}