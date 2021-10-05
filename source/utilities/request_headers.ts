interface HttpPostHeaders extends Record<string, string> {
  (contentType: string): {
    "Accept": string
    "Content-Type": string
  }

  "Accept": string
  "Content-Type": string
}

function makePostHeaders(contentType: string) {
  return {
    "Accept": contentType || "application/json",
    "Content-Type": contentType || "application/json"
  };
}

makePostHeaders.Accept = "application/json";
makePostHeaders["Content-Type"] = "application/json";

export const httpPostHeaders: HttpPostHeaders = makePostHeaders as HttpPostHeaders;

interface HttpGetHeaders extends Record<string, string> {
  (contentType: string): {
    "Accept": string
  }

  "Accept": string
}

function makeGetHeaders(contentType?: string) {
  return {
    "Accept": contentType || "application/json",
  };
}

makeGetHeaders.Accept = "application/json";

export const httpGetHeaders = makeGetHeaders as HttpGetHeaders;
