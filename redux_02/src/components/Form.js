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
  },

  getDefaultProps() {
    return {
      onSubmit: noop
    };
  },

  validations: [],


  submit(){
    this.props.onSubmit(_.assign({}, this.props.values));
    this.props.reset();
  },

  getChildContext() {
    return {
      update: this.props.update,
      reset: this.props.reset,
      submit: this.submit,
      values: this.props.values,
    };
  },

  render() {
    return (
      <form>
        {this.props.children}
      </form>
    );
  }
});