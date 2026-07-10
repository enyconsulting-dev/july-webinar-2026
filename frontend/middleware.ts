import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country") || "";
  const response = NextResponse.next();
  response.cookies.set("currency", country === "NG" ? "NGN" : "USD", {
    path: "/",
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
