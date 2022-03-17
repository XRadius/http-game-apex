export class Http {
  constructor(
    private readonly baseUrl: string,
    private readonly headers: Record<string, string>) {}
  
  async getAsync(relativeUrl: string) {
    const url = new URL(relativeUrl, this.baseUrl);
    return await fetch(url.toString(), {headers: this.headers});
  }
}
