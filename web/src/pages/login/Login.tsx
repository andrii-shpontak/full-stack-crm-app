import { loginFormInitialValues, loginValidationSchema } from '../../utils';

import { Formik } from 'formik';
import { LoginForm } from '../../components';
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
    </>
  );
};

export default Login;
