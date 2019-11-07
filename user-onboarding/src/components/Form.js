import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';

const LoginForm = ({values}) => {
    return(
        <Form>
            <label>
                Name: 
                &nbsp;
                <Field 
                    name='name' 
                    type='text' 
                    placeholder='name'
                    //value={values.name}
                    />
            </label>
            <label>
                Email: 
                &nbsp;
                <Field 
                    name='email' 
                    type='text' 
                    placeholder='email'
                    //value={values.email}
                    />
            </label>
            <label>
                Password:
                &nbsp;
                <Field 
                    name='password' 
                    type='password' 
                    placeholder='password'
                    //value={values.password}
                    />
            </label>
            <label className='levelCont'>
                Level:
                &nbsp;
                <Field
                    className='level-select'
                    name='level' 
                    component="select">
                    <option>Choose Your Level</option>
                    <option value="beginning">beginning</option>
                    <option value="intermediate">intermediate</option>
                    <option value="advanced">advanced</option>
                </Field>
            </label>
            <label  className='space'>
                Terms of Service: 
                &nbsp;
                <Field 
                    name='tos' 
                    type='checkbox'
                    placeholder=''
                    //value={values.}
                    />
            </label>
            <label>
                Bio: 
                &nbsp;
                <Field 
                    className='space'
                    name='bio'
                    component='textarea' 
                    placeholder='Tell us about yourself'
                    //value={values.}
                    />
            </label>
            <button>Submit</button>
        </Form>
    );
};

const FormikLoginForm = withFormik({
    mapPropsToValues({name, password, email, tos, level, bio}){
        return{
            name: name || '',
            password: password || '',
            email: email || '',
            tos: tos || false,
            level: level,
            bio: bio || '',
        };
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