export const filterFunc = (dest: string, skip?: String[]) => {
  let destArr = dest.split("/");

  if (skip) {
    const fieldsExist = destArr.some((item) => item === "fields");
    const mutationsExist = destArr.some((item) => item === "mutations");
    const queriesExist = destArr.some((item) => item === "queries");

    if (fieldsExist && skip.includes("f")) return false;
    if (mutationsExist && skip.includes("m")) return false;
    if (queriesExist && skip.includes("q")) return false;
  }

  return true;
};
