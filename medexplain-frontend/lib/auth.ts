import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  hash: string
) {
  return bcrypt.compare(password, hash);
}

export function generateToken(
  userId: string,
  email: string
) {
  return jwt.sign(
    {
      userId,
      email,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}
interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export function verifyToken(
  token: string
): JwtPayload {
  return jwt.verify(
    token,
    JWT_SECRET
  ) as JwtPayload;
}