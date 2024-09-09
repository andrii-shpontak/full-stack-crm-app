import { AbsoluteRoutes, loginFormInitialValues, loginValidationSchema } from '../../utils';

import { Formik } from 'formik';
import { LoginForm } from '../../components';
import { NavLink } from 'react-router-dom';
import type { TLoginFormValues } from '../../utils/types';
import { useHandlers } from './hooks';

const Login = () => {
  const { handleSubmit } = useHandlers();

  return (
    <>
      <h3>Login</h3>
      <Formik<TLoginFormValues>
        initialValues={loginFormInitialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}>
        <LoginForm />
      </Formik>
      <div>
        <p>Want to create an account?</p>
        <NavLink to={AbsoluteRoutes.signUp}>Go to Sign up page</NavLink>
      </div>
    </>
  );
};

export default Login;
