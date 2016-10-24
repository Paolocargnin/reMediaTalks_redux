// src/components/Form.js
import React, {PropTypes} from 'react';
import _ from 'lodash';


const noop = () => undefined;

export default React.createClass({
  propTypes: {
    children: PropTypes.node,
    values: PropTypes.object,
    update: PropTypes.func,
    reset: PropTypes.func,
    onSubmit: PropTypes.func
  },

  childContextTypes: {
    update: PropTypes.func,
    reset: PropTypes.func,
    submit: PropTypes.func,
    values: PropTypes.object,
    registerValidation: PropTypes.func,
    isFormValid: PropTypes.func,
  },

  getDefaultProps() {
    return {
      onSubmit: noop
    };
  },

  validations: [],

  registerValidation(isValidFunc) {
    this.validations = [...this.validations, isValidFunc];
    return this.removeValidation.bind(null, isValidFunc);
  },

  removeValidation(ref) {
    this.validations = _.without(this.validations, ref);
  },

  isFormValid(showErrors) {
    return this.validations.reduce((memo, isValidFunc) => 
      isValidFunc(showErrors) && memo, true);
  },

  submit(){
    if (this.isFormValid(true)) {
      this.props.onSubmit(_.assign({}, this.props.values));
      this.props.reset();
    }
  },

  getChildContext() {
    return {
      update: this.props.update,
      reset: this.props.reset,
      submit: this.submit,
      values: this.props.values,
      registerValidation: this.registerValidation,
      isFormValid: this.isFormValid
    };
  },

  render() {
    return (
      <form>
        {this.props.children}
      </form>
    );
  }
})