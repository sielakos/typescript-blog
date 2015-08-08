import * as mockery from 'mockery';
import * as sinon from 'sinon';
import {expect} from 'chai';
import mockeryInit from './mockeryInit';
import routingConfigurator from '../routingConfigurator';

describe('routingConfigurator', () => {
  let appMock;
  let routingConfigurator;

  mockeryInit();

  before(() => {
    appMock = {};
    mockery.registerMock('express', () => appMock);

    routingConfigurator = require('../routingConfigurator');
  });

  it('should export processConfig method', () => {
    expect(routingConfigurator.processConfig).to.exist;
  });

  it('should run node config function on express app', () => {
    let configSpy = sinon.spy();

    routingConfigurator.processConfig(configSpy);

    expect(configSpy.calledWith(appMock)).to.be.true;
  });
});
