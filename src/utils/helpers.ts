export const toPersinaDigit = (digits: number | string): string => {
  const fa = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return digits.toString().replaceAll(/\d/g, (w) => {
    return fa[+w];
  });
};

export const IsJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch {
    return false;
  }
  return true;
};

export const dereferenceSwagger = async (swagger: { [key: string]: any }) => {
  const dereferencedSwagger = { ...swagger };

  const resolveRef = (refPath: string, obj: any) => {
    const parts = refPath.split("/").slice(1);
    let result: any = obj;
    for (const part of parts) {
      result = result[part];
    }
    return result;
  };

  const traverse = (obj: any, visited: Set<any> = new Set()): any => {
    if (visited.has(obj)) {
      return obj;
    }
    visited.add(obj);

    if (typeof obj !== "object" || obj === null) {
      return obj;
    }
    if ("$ref" in obj) {
      const refPath = obj.$ref;
      const referencedObject = resolveRef(refPath, swagger);
      return traverse(referencedObject, visited);
    }
    if (Array.isArray(obj)) {
      return obj.map((item) => traverse(item, visited));
    }
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = traverse(obj[key], visited);
    }
    return newObj;
  };

  return traverse(dereferencedSwagger);
};
