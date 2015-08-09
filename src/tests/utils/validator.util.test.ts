import {expect} from 'chai';
import * as sinon from 'sinon';
import * as mockery from 'mockery';
import * as validator from '../../utils/validator.util';

describe('validator.util', () => {
  describe('ValidationResult', () => {
    let validationResult: validator.ValidationResult;

    beforeEach(() => {
      validationResult = new validator.ValidationResult();
    });

    it('should have default params in constructor', () => {
      expect(validationResult.pass).to.be.true;
      expect(validationResult.errors).to.be.eql({});
    });

    describe('addError', () => {
      it('should set pass to false', () => {
        validationResult.addError('field', 'ddd');

        expect(validationResult.pass).to.be.false;
      });

      it('should create new key in errors', () => {
        let field = 'x11';
        let error = 'dd2';

        validationResult.addError(field, error);

        expect(validationResult.errors[field]).to.be.eql([error]);
      });

      it('should append to existing array in errors', () => {
        let field = 'x11';
        let error1 = 'error';
        let error2 = 'dd2';

        validationResult.addError(field, error1);
        validationResult.addError(field, error2);

        expect(validationResult.errors[field]).to.be.eql([error1, error2]);
      });
    });

    describe('merge', () => {
      it('should perfom \'and\' operation on pass from both validationResults', () => {
        let otherResult = new validator.ValidationResult(false);

        validationResult.merge(otherResult);

        expect(validationResult.pass).to.be.false;

        validationResult.pass = true;
        otherResult.pass = true;
        validationResult.merge(otherResult);

        expect(validationResult.pass).to.be.true;
      });

      it('should merge errors from both sources', () => {
        let otherResult = new validator.ValidationResult();

        otherResult.addError('d1', 'error1');
        otherResult.addError('d1', 'error2');
        otherResult.addError('d3', 'error2');

        validationResult.addError('d1', 'error0');
        validationResult.addError('d2', 'error1');

        validationResult.merge(otherResult);

        expect(validationResult.errors).to.eql({
          d1: ['error0', 'error1', 'error2'],
          d2: ['error1'],
          d3: ['error2']
        });
      });
    });
  });
});
