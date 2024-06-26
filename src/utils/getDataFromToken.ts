import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY!);
    return decodedToken._id;
  } catch (error: any) {
    throw new Error(error.message)
  }
}
