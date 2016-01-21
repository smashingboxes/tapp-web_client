import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import faker from 'faker';

chai.use(chaiImmutable);

// Node doesn't have sessionStorage, so shim it out so we can run our tests
let sessionStorageData = {};
global.sessionStorage = {
  clear: function() { sessionStorageData = {}; },
  getItem: function(key) { return sessionStorageData[key] || null; },
  setItem: function(key, value) { sessionStorageData[key] = value; },
  removeItem: function(key) { delete sessionStorageData[key]; }
};

global.location = {
  host: faker.internet.domainName(),
  protocol: `${faker.internet.protocol()}:`
};
