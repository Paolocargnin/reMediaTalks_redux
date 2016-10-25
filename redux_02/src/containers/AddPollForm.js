import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class AddPollForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <Field className="form-control" name="author" component="input" type="text"/>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <Field className="form-control" name="title" component="input" type="text"/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <Field className="form-control" name="description" component="textarea" type="text"/>
        </div>
        <button className="btn btn-info btn-block" type="submit">Submit</button>
      </form>
    );
  }
}

// Decorate the form component
AddPollForm = reduxForm({
  form: 'addPoll', // a unique name for this form,
  initialValues : {
    author : 'Paolo Cargnin'
  }
})(AddPollForm);

export default AddPollForm;