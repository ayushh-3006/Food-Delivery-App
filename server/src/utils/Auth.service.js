import jwt from "jsonwebtoken";

export const genToken = async (user, res) => {
  try {
    const payLoad = { id: user._id };

    const token = await jwt.sign(payLoad, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("Oreo", token, {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      httpOnly: true,
      secure: false, // Set to true if using HTTPS in production
      sameSite: "lax",
    });

    return token;
  } catch (error) {
    throw error;
  }
};
