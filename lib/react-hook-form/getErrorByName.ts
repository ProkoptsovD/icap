import { FieldValues, UseFormReturn } from 'react-hook-form';

type GetErrorByNameParams<TFormValues extends FieldValues = FieldValues> = {
  form: UseFormReturn<TFormValues>;
  name: keyof TFormValues;
};

export const getErrorByName = <TFormValues extends FieldValues = FieldValues>({
  form,
  name,
}: GetErrorByNameParams<TFormValues>) => {
  const error = form.formState.errors[name];

  return error;
};
