import { expect } from 'chai';
import HttpService from './HttpService';
import axios from 'axios';
import { spy } from 'sinon';

describe('HttpService', () => {
  describe('accessBrightWolf', () => {
    const brightWolfUrl = 'http://bw-c2230-002.bright-wolf.net/';
    const expectedEndpoint = 'foo';
    let httpService;
    let brightWolf;

    before(() => {
      brightWolf = spy(axios, 'get');
    });

    beforeEach(() => {
      httpService = new HttpService();
      httpService.accessBrightWolf(expectedEndpoint);
    });

    it('returns an instance of Axios doing a get', () => {
      expect(brightWolf.calledOnce).to.be.true;
    });

    it('does a get on the full url', () => {
      expect(brightWolf.firstCall.args[0]).to.equal(`${brightWolfUrl}${expectedEndpoint}`);
    });

    afterEach(() => {
      brightWolf.reset();
    });

    after(() => {
      brightWolf.restore();
    });
  });

  describe('accessHost', () => {
    const expectedEndpoint = 'bar';
    let httpService;
    let host;

    before(() => {
      host = spy(axios, 'get');
    });

    beforeEach(() => {
      httpService = new HttpService();
      httpService.accessHost(expectedEndpoint);
    });

    it('returns an instance of Axios doing a get', () => {
      expect(host.calledOnce).to.be.true;
    });

    it('returns the endpoint in the get', () => {
      process.env.NODE_ENV = 'development';
      expect(host.firstCall.args[0]).to.equal(`${expectedEndpoint}`);
    });

    afterEach(() => {
      host.reset();
    });

    after(() => {
      host.restore();
    });
  });
});

