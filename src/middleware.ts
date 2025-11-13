  import { NextResponse } from "next/server";
  import type { NextRequest } from "next/server";
  import { ROUTES } from "./utils/constants/routes";

const PROTECTED = [ROUTES.AUTH.PROFILE] as string[];

  export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (PROTECTED.includes(req.nextUrl.pathname) && !token) {
      const url = req.nextUrl.clone();
      url.pathname = ROUTES.AUTH.LOGIN;
      url.searchParams.set("from", req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  export const config = {
    matcher: ["/auth/profile"],
  };
