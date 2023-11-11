import JSDOMEnvironment from 'jest-environment-jsdom';

export default class FixJSDOMEnvironment extends JSDOMEnvironment {
  constructor(...args: ConstructorParameters<typeof JSDOMEnvironment>) {
    super(...args);

    // FIXME https://github.com/jsdom/jsdom/issues/1724
    if (!this.global.fetch) {
      this.global.fetch = fetch;
      this.global.Headers = Headers;
      this.global.Request = Request;
      this.global.Response = Response;
    }
  }
}
