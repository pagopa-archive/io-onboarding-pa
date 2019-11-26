export interface IConfig {
  IO_ONBOARDING_PA_API_HOST: string;
  IO_ONBOARDING_PA_API_PORT: string;
  IO_ONBOARDING_PA_SHOW_FAKE_IDP: string;
  IO_ONBOARDING_PA_IS_MOCK_ENV: string;
  IO_ONBOARDING_PA_SESSION_TOKEN_DOMAIN: string;
}

export function getConfig(param: keyof IConfig): string {
  if (!("_env_" in window)) {
    throw new Error("Missing configuration");
  }
  // tslint:disable-next-line: no-any
  if (!(window as any)._env_[param]) {
    throw new Error("Missing required environment variable: " + param);
  }
  // tslint:disable-next-line: no-any
  return (window as any)._env_[param];
}
