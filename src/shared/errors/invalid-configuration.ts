export class InvalidConfiguration extends Error {
  constructor(provider: string) {
    super(`${provider} provider is misconfigured. Verify the environment variables`);
  }
}
