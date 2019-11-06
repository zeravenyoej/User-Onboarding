import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';

const LoginForm = () => {
    return(
        <Form>
            <label>
                Name: 
                &nbsp;
                <Field name='name' type='' placeholder='name'/>
            </label>
            <label>
                Email: 
                &nbsp;
                <Field name='email' type='' placeholder='email'/>
            </label>
            <label>
                Password:
                &nbsp;
                <Field name='password' type='' placeholder='password'/>
            </label>
            <label>
                Terms of Service: 
                &nbsp;
                <Field name='tos' type='' placeholder=''/>
            </label>
            <button>Submit</button>
        </Form>
    );
};

const FormikLoginForm = withFormik({
    mapPropsToValues({name, password, email, tos}){
        return{
            name: name || '',
            password: password || '',
            email: email || '',
            tos: tos || false
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email()
            .required(),
        password: Yup.string()
            .min(6)
            .required()
    }),

    handleSubmit(values) {
        console.log(values)
    }

})(LoginForm);

export default FormikLoginForm;