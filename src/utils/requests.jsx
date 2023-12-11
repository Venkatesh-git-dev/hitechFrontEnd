const waitSec = 10;

export default async function fetchData({ endPoint, method, body }) {
  method = method.trim().toUpperCase();

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  };

  switch (method) {
    case "GET":
      delete options.headers;
    case "DELETE":
      delete options.body;
      break;
    default:
      break;
  }

  const res = fetch(`/api/${endPoint}`, options);
  const data = await Promise.race([
    res,
    new Promise((_, reject) =>
      setTimeout(
        () =>
          reject({
            ok: false,
            statusText:
              "Request taking too long. Please try again after few minutes.",
          }),
        waitSec * 1000,
      ),
    ),
  ]);
  return data;
}
