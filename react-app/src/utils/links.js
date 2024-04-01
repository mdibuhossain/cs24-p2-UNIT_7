export const ADMIN_NAVs = [
  { name: "Dashboard", path: "/" },
  { name: "Show Users", path: "/users" },
  // { name: "Available Roles", path: "/roles" },
  // { name: "Assign Role", path: "/assign-role" },
  { name: "Create User", path: "/create-user" },
  { name: "STS managers", path: "/sts-manager" },
  { name: "Landfill managers", path: "/landfill-manager" },
  { name: "Available STS", path: "/all-sts" },
  { name: "Available Landfill", path: "/all-landfill" },
  { name: "Create STS", path: "/create-sts" },
  { name: "Create Landfill", path: "/create-landfill" },
  { name: "Add Vehicle", path: "/add-vehicle" },
];

export const STS_NAVs = [
  { name: "Leaving vehicle record entry", path: "/sts-vehicle-entry" },
  { name: "Vehicle records", path: "/sts-vehicle-records" },
];

export const LANDFILL_NAVs = [
  { name: "Entry dump record", path: "/landfill-vehicle-entry" },
  { name: "Dump records", path: "/landfill-vehicle-records" },
];

export const COMMON_NAVs = [{ name: "Profile", path: "/profile" }];
