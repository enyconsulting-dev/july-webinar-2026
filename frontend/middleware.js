export function middleware(request) {
  const country = request.headers.get('x-vercel-ip-country') || '';
  const response = new Response(null, { status: 200 });
  response.headers.set('x-webinar-currency', country === 'NG' ? 'NGN' : 'USD');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
