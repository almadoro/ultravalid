export default function fmt(
  strings: TemplateStringsArray,
  ...values: unknown[]
) {
  let result = "";
  for (let i = 0; i < strings.length - 1; i++) {
    const string = strings[i];
    const value = values[i];
    result += string;
    result += formatValue(value);
  }
  result += strings[strings.length - 1];
  return result;
}

function formatValue(value: unknown) {
  switch (typeof value) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "symbol":
      return value.toString();
    case "undefined":
      return "undefined";
    case "function":
      const name = value.name;
      return name ? `function(${value.name})` : `anonymous function`;
    case "object":
      // TODO: Dont use JSON.stringify
      const str = JSON.stringify(value);
      if (str.length <= 30) return str;
      return (
        str.substring(0, 13) + " ... " + str.slice(str.length - 12, str.length)
      );
  }
}
