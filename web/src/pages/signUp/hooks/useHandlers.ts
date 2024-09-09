import type { TSignUpFormValues } from '../../../utils/types';
import { useCallback } from 'react';

export function useHandlers() {
  const handleSubmit = useCallback(async (values: TSignUpFormValues) => {
    console.log(values);
  }, []);

  return { handleSubmit };
}
