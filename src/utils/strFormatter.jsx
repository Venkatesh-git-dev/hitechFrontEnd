function sentenceCase(str) {
  const str1 = str.replace("_", " ").trim();
  return str1.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
}

function capitalCase(str) {
  if (str.trim() === "") return;
  return str
    .toLowerCase()
    .split(" ")
    .map((x) => (x ? x[0].toUpperCase() + x.slice(1) : ""))
    .join(" ");
}

function camelCase(str) {
  if (str.trim() === "") return;
  const str1 = capitalCase(str);
  return str1[0].toLowerCase() + str1.slice(1);
}

export { camelCase, capitalCase, sentenceCase };
