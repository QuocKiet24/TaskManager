import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" }); // Return to stop execution
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" }); // Return to stop execution
    }

    req.userId = decoded.userId; // Attach userId to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log("Error in verifyToken ", error);
    return res.status(500).json({ success: false, message: "Server error" }); // Return to stop execution
  }
};
