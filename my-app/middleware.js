import { NextResponse } from "next/server";

export function middleware(request) {
  return NextResponse.next();
}
export const config = {
  matcher: ["/myblogs/:path*", "/api/:path*", "/dashboard/:path*"],
};
