import { Router } from "express";
import passport from "passport";

const router = Router();

router.post("/sign-in", passport.authenticate("sign-in"), (req, res, next) => {
  const { user } = req;
  if (!req.isAuthenticated()) {
    res.status(401).json({ message: "Email or password is invalid" });
    return next();
  }
  res.redirect("/private");
});

router.post("/sign-out", (req, res, next) => {
  const { user } = req;
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.json({ message: `Goodbye ${user.email}.` });
  });
});

export default router;
