//middleware.ts


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isUserAuthenticated } from "./src/config";
import { SIGN_IN_PAGE, SIGN_UP_PAGE } from "@/routes";


const protectedRoutes = [SIGN_IN_PAGE,SIGN_UP_PAGE,"resetpassword"];


export default function middleware(req: NextRequest) {
  if (!isUserAuthenticated && !protectedRoutes.includes(req.nextUrl.pathname)) {
    
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
