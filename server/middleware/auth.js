import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "❌ No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "devsecret");
    req.user = decoded; // attach decoded payload
    next();
  } catch (err) {
    return res.status(403).json({ message: "❌ Invalid or expired token" });
  }
}
