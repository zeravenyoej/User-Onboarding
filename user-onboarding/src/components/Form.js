import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';

const LoginForm = ({values, touched, errors}) => {
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
                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}
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
                    {touched.email && errors.email && (
                        <p>{errors.email}</p>
                    )}
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
                    {touched.password && errors.password && (
                        <p>{errors.password}</p>
                    )}
            </label>
            <label className='levelCont'>
                Level:
                &nbsp;
                <Field
                    className='level-select'
                    name='level' 
                    component="select">
                    <option>Choose Your Level</option>
                    <option value="beginner">beginner</option>
                    <option value="intermediate">intermediate</option>
                    <option value="advanced">advanced</option>
                </Field>
                {touched.level && errors.level && (
                    <p>{errors.level}</p>
                )}
            </label>
            <label  className='space'>
                Terms of Service: 
                &nbsp;
                <Field
                    required
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
        name: Yup.string().required('THIS IS REQUIRED!!'),
        email: Yup.string().email().required('I need your email and it must be valid.'),
        password: Yup.string().min(6).required('At least six characters please'),
        level: Yup.string().oneOf(["beginner", "intermediate", "advanced"]).required("PLEASE select one")
    }),
    handleSubmit(values) {
        console.log(values)
    }
})(LoginForm);

export default FormikLoginForm;