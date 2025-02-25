import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(async function logoutRoute(req, res) {
  req.session.destroy();
  await req.session.save();
  
  res.send(
    JSON.stringify({
      status: 200,
      message: "Logout Successful.",
    })
  );
}, sessionOptions);
