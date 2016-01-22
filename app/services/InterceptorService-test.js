import { expect } from 'chai';
import faker from 'faker';
import InterceptorService, { setUpHostname } from './InterceptorService.js';

describe('InterceptorService', () => {
  describe('setUpHostname', () => {
    const expectedPath = `${faker.hacker.noun()}/${faker.hacker.verb()}`;
    let NODE_ENV;

    before(() => {
      NODE_ENV = process.env.NODE_ENV;
    });

    beforeEach(() => {
      InterceptorService.init();
    });

    it('adds localhost to the path in development environments', () => {
      process.env.NODE_ENV = 'development';
      const config = setUpHostname({ url: expectedPath });

      expect(config.url).to.equal(`http://localhost:3000/${expectedPath}`);
    });

    it('does not add localhost to non-development environments', () => {
      process.env.NODE_ENV = 'not development';
      const config = setUpHostname({ url: expectedPath });

      expect(config.url).to.equal(expectedPath);
    });

    after(() => {
      process.env.NODE_ENV = NODE_ENV;
    });
  });
});
