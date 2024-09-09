import './SignUpForm.scss';

import { Form, useFormikContext } from 'formik';
import { MouseEvent, useCallback } from 'react';

import CustomInput from '../CustomInput/CustomInput';
import type { TSignUpFormValues } from '../../utils/types';

const SignUpForm = () => {
  const { setFieldValue } = useFormikContext<TSignUpFormValues>();

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
      <CustomInput label='Name' name='name' type='text' placeholder='John Doe' onClear={handleCleatInput} />
      <CustomInput label='Phone number' name='phone' type='tel' placeholder='+16507777777' onClear={handleCleatInput} />
      <CustomInput
        label='Email'
        name='email'
        type='email'
        placeholder='example@domain.com'
        onClear={handleCleatInput}
      />
      <CustomInput label='Password' name='password' type='password' placeholder='password' onClear={handleCleatInput} />
      <CustomInput
        label='Confirm password'
        name='re_password'
        type='password'
        placeholder='password'
        onClear={handleCleatInput}
      />
      <button type='submit'>Submit</button>
    </Form>
  );
};

export default SignUpForm;
