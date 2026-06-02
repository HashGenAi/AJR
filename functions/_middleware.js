export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname === "ajrajr.pages.dev") {
    return Response.redirect(
      `https://www.jiorockers.online${url.pathname}${url.search}`,
      301
    );
  }

  return context.next();
}
