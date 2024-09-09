import { AbsoluteRoutes, signUpFormInitialValues, signUpValidationSchema } from '../../utils';

import { Formik } from 'formik';
import { NavLink } from 'react-router-dom';
import { SignUpForm } from '../../components';
import type { TSignUpFormValues } from '../../utils/types';
import { useHandlers } from './hooks';

const SignUp = () => {
  const { handleSubmit } = useHandlers();

  return (
    <>
      <h3>Sign up</h3>
      <Formik<TSignUpFormValues>
        initialValues={signUpFormInitialValues}
        validationSchema={signUpValidationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}>
        <SignUpForm />
      </Formik>
      <div>
        <p>Already have an account?</p>
        <NavLink to={AbsoluteRoutes.login}>Go to Login page</NavLink>
      </div>
    </>
  );
};

export default SignUp;
