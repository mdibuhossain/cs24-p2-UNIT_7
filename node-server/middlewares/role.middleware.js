export class roleMiddleware {
  // Add a middleware function to check if the user is an admin
  static isAdmin(req, res, next) {
    if (req.user.role !== "SYSTEM_ADMIN") {
      return res
        .status(403)
        .json({ message: "Access denied. You are not an admin." });
    }
    next();
  }

  // Add a middleware function to check if the user is a STS manager
  static isSTSManager(req, res, next) {
    if (req.user.role !== "STS_MANAGER") {
      return res
        .status(403)
        .json({ message: "Access denied. You are not a STS manager." });
    }
    next();
  }

  // Add a middleware function to check if the user is landfill manager
  static isLandfillManager(req, res, next) {
    if (req.user.role !== "LANDFILL_MANAGER") {
      return res
        .status(403)
        .json({ message: "Access denied. You are not a landfill manager." });
    }
    next();
  }

  // check if user has been assigned by any role?
  static isAssigned(req, res, next) {
    if (!req.user.role) {
      return res
        .status(403)
        .json({ message: "Access denied. You are not assigned any role." });
    }
    next();
  }
}
