import './CustomInput.scss';

import { ErrorMessage, Field } from 'formik';
import { useCallback, useState } from 'react';

import type { TCustomInputProps } from '../../utils/types';
import clearIcon from '../../assets/images/clearIcon.svg';
import closeEye from '../../assets/images/hiddenPass.svg';
import openEye from '../../assets/images/visiblePass.svg';

const CustomInput = ({ label, name, placeholder, type, onClear }: TCustomInputProps) => {
  const [customType, setType] = useState<string>(type);

  const onPasswordIconClick = useCallback(() => {
    setType(currType => {
      if (currType === 'password') {
        return 'text';
      } else {
        return 'password';
      }
    });
  }, []);

  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <Field name={name} type={customType} className='form-control' placeholder={placeholder} />
      <div className='iconBox'>
        {type === 'password' && (
          <img
            src={customType === 'password' ? closeEye : openEye}
            alt='show-or-hide-password'
            onClick={onPasswordIconClick}
          />
        )}
        <img src={clearIcon} id={name} alt='clear-icon' className='clearIcon' onClick={onClear} />
      </div>
      <ErrorMessage name={name} component='div' className='error-message' />
    </div>
  );
};

export default CustomInput;
