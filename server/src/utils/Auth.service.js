import jwt from "jsonwebtoken";
const genToken = async (user) => {
  try {
    const payLoad = { id: user._id };

    const token = await jwt.sign(payLoad, process.env.JWT_SECRET, {
      expiresIn: "Id",
    });

    res.cookie("oreo", token, { maxAge: 1000 * 60 * 60 * 24 , });
  } catch (error) {}
};

