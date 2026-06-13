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

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}