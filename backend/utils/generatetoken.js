import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN

    if (!token)
      return res.status(401).json({ message: "No token, authorization denied" });

    const decoded = jwt.verify(token, "MY_SECRET_KEY");
    req.user = decoded; // put decoded user into request

    next();

  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const protectAdmin = (req, res, next) => {
  try {
    console.log(req.headers)
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "No token, authorization denied" });

    const decoded = jwt.verify(token, "MY_SECRET_KEY");
    console.log(decoded.role)
    if(decoded.role!="admin")
      return res.status(400).json({message : "UnAuthorized"});
    req.user = decoded; // put decoded user into request

    next();

  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};


const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },            // payload
    "MY_SECRET_KEY",         // change this later
    { expiresIn: "7d" }      // token valid for 7 days
  );
};

export default generateToken;
