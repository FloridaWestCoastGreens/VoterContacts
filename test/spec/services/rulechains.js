'use strict';

describe('Service: ruleChains', function () {

  // load the service's module
  beforeEach(module('voterContactsApp'));

  // instantiate service
  var ruleChains;
  beforeEach(inject(function (_ruleChains_) {
    ruleChains = _ruleChains_;
  }));

  it('should do something', function () {
    expect(!!ruleChains).toBe(true);
  });

});
