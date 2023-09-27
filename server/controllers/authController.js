const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    email = email.toLowerCase();

    const foundUser = await User.findOne({
      where: { email },
    });

    if (!foundUser || !foundUser.active) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) return res.status(401).json({ message: "Unauthorized" });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: foundUser.id,
          email: foundUser.email,
          role: foundUser.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: foundUser.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "3d" }
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 3 * 24 * 60 * 60 * 1000, //cookie expiry: set to match refresh token!
    });

    // Send accessToken containing email and roles
    res.json({ accessToken });
  } catch (error) {
    console.error(error);
  }
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

    const refreshToken = cookies.jwt;

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        try {
          if (err) return res.status(403).json({ message: "Forbidden" });

          const foundUser = await User.findOne({
            attributes: {
              exclude: ["password", "passwordReset"],
            },
            where: { id: decoded.id },
          });

          if (!foundUser) {
            return res.status(401).json({ message: "Unauthorized" });
          }

          const accessToken = jwt.sign(
            {
              UserInfo: {
                id: foundUser.id,
                email: foundUser.email,
                role: foundUser.role,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
          );

          res.json({ accessToken });
        } catch (error) {
          console.error(error);
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.json({ message: "Cookie cleared" });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  login,
  refresh,
  logout,
};
