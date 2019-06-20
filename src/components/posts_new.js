import React, {Component} from 'react';
import { Field, reduxForm } from "redux-form";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {createPost} from "../actions";
import Swal from 'sweetalert2';

class PostsNew extends Component{
    renderField( field ){ //field has some event handlers, responsible for the Field component
        const {meta:{touched, error}} = field;
        let errortext = touched ?  error : null;
        let className = `form-group ${errortext ? 'has-danger' : ''}`;
        let Input;
        if (field.type == "textarea") {
            Input = <textarea
                type={field.type}
                placeholder={`Type ${field.label}`}
                className={"form-control"}
                {...field.input} // this instead of the above
            > </textarea>;
        }else{
            Input = <input
                type={field.type}
                placeholder={`Type ${field.label}`}
                className={"form-control"}
                // onChange={field.input.onChange}
                // onFocus={field.input.onFocus}
                {...field.input} // this instead of the above
            />;
        }


        return (
          <div className={className}>
              <label>{field.label}</label>
              {Input}
              <small className={'text-help'}>{errortext}</small>
          </div>  
        );
    }

    onSubmit(values){
        console.table({values});
        this.props.createPost(values, ()=>{
            this.props.history.push("/");
            Swal.fire('success', 'The post has been created', 'success' );
        });
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="card">
                <div className="card-block">
                    <h4 className="card-title">Add New Post</h4>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field
                            label={"Title"}
                            type={"text"}
                            name={"title"}
                            component={this.renderField}
                        />
                        <Field
                            label={"Categories"}
                            type={"text"}
                            name={"categories"}
                            component={this.renderField}
                        />
                        <Field
                            label={"Post Content"}
                            name={"content"}
                            type={'textarea'}
                            component={this.renderField}
                        />
                        <button type={'submit'} className={"btn btn-primary-outline"}> Save </button>
                        <Link to={'/'} className={'btn btn-danger-outline'}>Cancel</Link>
                    </form>
                </div>
            </div>

        );
    }

}

const validate = values => {
    // console.log(values);
    //errors container
    const errors = {};

    //validate the inputs from values
    if (!values.title){
        errors.title = "Enter a title!"; //title is the 'name' prop of the input
    }
    if (!values.categories){
        errors.categories = "Enter categories!";
    }
    if (!values.content){
        errors.content = "Enter some content Please!";
    }

    //if errors is empty, the form is fine to submit
    //else redux form assumes invalid
    return errors;
};


export default reduxForm({ //this is like the connect function in redux, maps state to props
    validate,
    form: 'PostsNewForm' //unique name of the form inside redux
})(
    connect (null, { createPost }) (PostsNew)
);