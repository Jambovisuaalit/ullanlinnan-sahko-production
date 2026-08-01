import { NextResponse } from "next/server";

const destination = "/sahkoasennukset-ja-vikakorjaukset";

export function GET(request: Request) {
  return NextResponse.redirect(new URL(destination, request.url), 301);
}

export function HEAD(request: Request) {
  return NextResponse.redirect(new URL(destination, request.url), 301);
}
