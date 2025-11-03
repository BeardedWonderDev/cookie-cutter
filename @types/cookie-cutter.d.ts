interface CookieOptions {
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  HttpOnly?: boolean;
  MaxAge?: number;
  SameSite?: SameSiteOptions;
  partitioned?: boolean;
}

declare enum SameSiteOptions {
  Strict = "Strict",
  Lax = "Lax",
  None = "None",
}

interface Cookie {
  get(key: string): string | undefined;
  set(key: string, value: string, options?: CookieOptions): string;
  clear(key: string, options?: CookieOptions): string;
}

interface CookieConfig {
  suppressInsecureSameSiteNoneWarning?: boolean;
}

declare module "@boiseitguru/cookie-cutter" {
  function cookie(doc?: Document | string): Cookie;

  namespace cookie {
    function configure(options: CookieConfig): void;
    export const get: (key: string) => string | undefined;
    export const set: (
        key: string,
        value: string,
        options?: CookieOptions
    ) => string;
    export const clear: (
        key: string,
        options?: CookieOptions
    ) => string;
  }

  export = cookie;
}
