import './LoginForm.scss';

import { Form, useFormikContext } from 'formik';
import { MouseEvent, useCallback } from 'react';

import CustomInput from '../CustomInput/CustomInput';
import type { TLoginFormValues } from '../../utils/types';

const LoginForm = () => {
  const { setFieldValue } = useFormikContext<TLoginFormValues>();

  const handleCleatInput = useCallback(
    (e: MouseEvent<HTMLImageElement>) => {
      e.stopPropagation();
      const name = e.currentTarget.id;
      setFieldValue(name, '');
    },
    [setFieldValue],
  );

  return (
    <Form className='form'>
      <CustomInput
        label='Phone number or Email'
        name='username'
        type='text'
        placeholder='number or email'
        onClear={handleCleatInput}
      />
      <CustomInput label='Password' name='password' type='password' placeholder='password' onClear={handleCleatInput} />
      <button type='submit'>Login</button>
    </Form>
  );
};

export default LoginForm;
