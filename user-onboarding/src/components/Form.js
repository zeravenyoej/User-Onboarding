import React, {useState, useEffect} from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';

//YOU DON'T NEED VALUES TO BE DECONSTRUCTED IN THE LINE BELOW?
const LoginForm = ({ touched, errors, status}) => {
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        status && setUsers(users=>[...users, status])
    }, [status]);


    return(
    <div>
        <Form>
            <label>
                Name: 
                &nbsp;
                <Field 
                    name='name' 
                    type='text' 
                    placeholder='name'
                    />
                {touched.name && errors.name && <p>{errors.name}</p>}
            </label>
            <label>
                Email: 
                &nbsp;
                <Field 
                    name='email' 
                    type='text' 
                    placeholder='email'
                    />
                    {touched.email && errors.email && <p>{errors.email}</p>}
            </label>
            <label>
                Password:
                &nbsp;
                <Field 
                    name='password' 
                    type='password' 
                    placeholder='password'
                    />
                    {touched.password && errors.password && <p>{errors.password}</p>}
            </label>
            <label className='levelCont'>
                Level:
                &nbsp;
                <Field
                    className='level-select'
                    name='role' 
                    component="select">
                    <option>choose your role</option>
                    <option value="frontend dev">frontend dev</option>
                    <option value="backend dev">backend dev</option>
                    <option value="stylist">stylist</option>
                </Field>
                {touched.role && errors.role && <p>{errors.role}</p>}
            </label>
            <label>
                Bio: 
                &nbsp;
                <Field 
                    className='space'
                    name='bio'
                    component='textarea' 
                    placeholder='Tell us about yourself'
                    />
            </label>
            <label  className='space'>
                Terms of Service: 
                &nbsp;
                <Field
//WHY DOES CHRSITINA HAVE THAT LINE BELOW?
                    //checked={values.vaccinations}
                    required
                    name='tos' 
                    type='checkbox'
                    />
            </label>
            <button type='submit'>Submit</button>
        </Form>

        {users.map(user=>(
            <div className='returnedData' key={user.id}>
                <p>Name: {user.name}</p>
                <p>email: {user.email}</p>
                <p>password: {user.password}</p>
                <p>level: {user.level}</p>
                <p>bio: {user.bio}</p>
            </div>
        ))}
    </div>
    );
};

const FormikLoginForm = withFormik({
    mapPropsToValues({name, password, email, tos, level, bio}){
        return{
            name: name || '',
            password: password || '',
            email: email || '',
            tos: tos || false,
            level: level || '',
            bio: bio || '',
        };
    },
    validationSchema: Yup.object().shape({
//WHY DO SOME OF MY REQUIRED MESSAGES GET OVERWRITTEN?
        name: Yup.string().required('THIS IS REQUIRED!!'),
        email: Yup.string().email().required('I need your email and it must be valid.'),
        password: Yup.string().min(6).required('At least six characters please'),
        role: Yup.string().oneOf(["stylist", "frontend dev", "backend dev"]).required("PLEASE select one")
    }),
    handleSubmit(values, {setStatus}) {
        axios.post('https://reqres.in/api/users/', values)
            .then(res=>{
                //console.log(res.data)
                setStatus(res.data)
            })
            .catch(err=>{
                console.log(err)
            });
    }
})(LoginForm);

export default FormikLoginForm;