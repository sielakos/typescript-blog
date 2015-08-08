import * as mockery from 'mockery';

export default () => {
  before(() => {
  	mockery.enable();
    mockery.warnOnUnregistered(false);
  });

  after(() => {
  	mockery.deregisterAll();
  	mockery.disable();
  });
}
