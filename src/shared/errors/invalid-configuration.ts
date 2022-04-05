export class InvalidConfiguration extends Error {
  constructor(provider: string, key: string) {
    super(`${provider} provider is misconfigured. ${key} field is missing. Verify env variables`);
  }
}
