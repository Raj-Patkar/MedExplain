import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      password,
    } = body;

    if (
      !fullName ||
      !email ||
      !password
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields required",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await pool.query(
      `
      SELECT id
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    if (
      existingUser.rows.length > 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email already registered",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword =
      await hashPassword(password);

    const result = await pool.query(
      `
      INSERT INTO users
      (
        full_name,
        email,
        password_hash
      )
      VALUES
      (
        $1,
        $2,
        $3
      )
      RETURNING
      id,
      full_name,
      email
      `,
      [
        fullName,
        email,
        hashedPassword,
      ]
    );

    return NextResponse.json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Registration failed",
      },
      {
        status: 500,
      }
    );
  }
}