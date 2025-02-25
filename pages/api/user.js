import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/session';

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req, res) {
  const user = req.session.user;
  // console.log(req.session);

  if (!user) {
    // res.redirect("/");
    res.json({
      isLoggedIn: false,
      user: '',
    });
    return;
  }

  res.json({
    user: user.userData,
    role: 'student',
    isLoggedIn: true,
  });
}
