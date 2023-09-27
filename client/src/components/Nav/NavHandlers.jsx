export const sectionHandler = (role) => {
  let employee = [
    { name: "Dashboard", href: "/dash/dashboard", current: true },
  ];

  let admin = [{ name: "Users", href: "/dash/users", current: false }];

  let superAdmin = [];

  if (role === "Employee") {
    return employee;
  } else if (role === "Admin") {
    return [...employee, ...admin];
  } else if (role === "SuperAdmin") {
    return [...employee, ...admin, ...superAdmin];
  }
};
