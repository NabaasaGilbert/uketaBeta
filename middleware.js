import { NextResponse } from 'next/server';

export async function middleware(req) {
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith('/start')) {
    return NextResponse.rewrite('https://162.241.24.152/~simbapr1/public_html/uketalearning/start' + url.pathname.replace('/start', ''));
  }

  return NextResponse.next();
}
