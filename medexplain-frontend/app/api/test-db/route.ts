import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT NOW() as current_time"
    );

    return NextResponse.json({
      success: true,
      database: "connected",
      time: result.rows[0].current_time,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Database connection failed",
      },
      { status: 500 }
    );
  }
}