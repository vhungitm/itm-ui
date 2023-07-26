import * as React from 'react';
import { ChangeEvent } from 'react';
import { Control, useController } from 'react-hook-form';
import { FieldCheckProps } from './FieldCheck';
import { FieldCheckGroup, FieldCheckGroupProps } from './FieldCheckGroup';
import { FieldFeedbackProps } from './FieldFeedback';

export interface FormFieldCheckGroupElementProps extends FieldCheckProps {
  control: Control<any, any>;
  name: string;
}

export interface FormFieldCheckGroupProps extends FieldCheckGroupProps {
  element: FormFieldCheckGroupElementProps;
}

export const FormFieldCheckGroup = (props: FormFieldCheckGroupProps) => {
  const { label, element, ...groupProps } = props;
  const { control, name, ...elementProps } = element;
  let {
    field: { ref, onChange, ...fieldProps },
    fieldState,
  } = useController({ control, name });

  const error: FieldFeedbackProps | undefined = fieldState.error && {
    type: 'invalid',
    message: fieldState.error.message,
  };

  const isInvalid = fieldState?.error ? true : false;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: eventValue, checked } = e.target;
    const { value } = fieldProps;
    const { type, options = [] } = elementProps;

    if (checked)
      onChange(
        type === 'radio'
          ? eventValue
          : options.length >= 2
          ? [...value, eventValue]
          : true,
      );
    else
      onChange(
        options.length >= 2
          ? value.filter((item: any) => item !== eventValue)
          : false,
      );
  };

  return (
    <FieldCheckGroup
      label={label}
      element={{
        ...fieldProps,
        onChange: handleChange,
        ...elementProps,
        isInvalid,
      }}
      {...groupProps}
      error={error}
    />
  );
};
