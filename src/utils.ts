export const getAvatarByName = (name: string) => {
  https: return `https://ui-avatars.com/api/?name=${name}&background=random`;
};

export const isEmpty = (str: unknown): boolean => {
  return (
    str === "" ||
    str === null ||
    str === undefined ||
    str === "undefined" ||
    !str ||
    (Array.isArray(str) && !str.length) ||
    (typeof str === "object" && Object.entries(str).length === 0)
  );
};
