// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions

const SECRET = process.env.SECRET;

export const sessionOptions = {
  httpOnly: true,
  cookieName: "uketa_cookie",
  password: SECRET,
  ttl: 10800,
  // maxAge: (ttl === 0 ? 120 : ttl) - 60,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production" ? true : false,
  },
};
