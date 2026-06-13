import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import {
  comparePassword,
  generateToken,
} from "@/lib/auth";

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const {
      email,
      password,
    } = body;

    const result = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    const user = result.rows[0];

    const validPassword =
      await comparePassword(
        password,
        user.password_hash
      );

    if (!validPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    const token = generateToken(
      user.id,
      user.email
    );

    const response =
      NextResponse.json({
        success: true,
        user: {
          id: user.id,
          fullName: user.full_name,
          email: user.email,
        },
      });

    response.cookies.set(
      "medexplain_token",
      token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "strict",
        path: "/",
        maxAge:
          60 * 60 * 24 * 7,
      }
    );

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Login failed",
      },
      {
        status: 500,
      }
    );
  }
}