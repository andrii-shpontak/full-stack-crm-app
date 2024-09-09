import * as yup from 'yup';

export const signUpValidationSchema = yup.object().shape({
  name: yup.string().min(3, 'Minimum 3 characters!').required('Name is required!'),
  phone: yup.number().min(9, 'Minimum 9 characters!').required('Phone number is required!'),
  email: yup.string().email('Invalid email format!'),
  password: yup.string().min(4, 'Minimum 4 characters!').required('Password is required!'),
  re_password: yup
    .string()
    .min(4, 'Minimum 4 characters!')
    .required('Confirm password is required!')
    .oneOf([yup.ref('password')], 'Confirm should be the same as password'),
});
