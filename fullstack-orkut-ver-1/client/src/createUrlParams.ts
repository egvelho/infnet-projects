export function createUrlParams(objArg: any) {
  const obj = { ...objArg };
  for (let key of Object.keys(obj)) {
    if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
      delete obj[key];
    }
  }
  const urlParams = new URLSearchParams(obj).toString();
  return urlParams.length > 0 ? `?${urlParams}` : urlParams;
}
