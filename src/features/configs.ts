export enum AUTH_FORM {
  login = "login",
  register = "register",
}

export enum SIDEBAR_TYPE {
  basic = "basic",
  additional = "additional",
  spouse = "spouse",
  personal = "personal",
}

export const sidebarItems = [
  { name: SIDEBAR_TYPE.basic, title: "Basic Details" },
  { name: SIDEBAR_TYPE.additional, title: "Additional Details" },
  { name: SIDEBAR_TYPE.spouse, title: "Spouse Details" },
  { name: SIDEBAR_TYPE.personal, title: "Personal Details" },
];
