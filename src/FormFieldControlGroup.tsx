import * as React from 'react';
import { Control, useController } from 'react-hook-form';
import { FieldControlProps } from './FieldControl';
import { FieldControlGroup, FieldControlGroupProps } from './FieldControlGroup';
import { FieldFeedbackProps } from './FieldFeedback';

export interface FormFieldControlGroupElementProps extends FieldControlProps {
  control: Control<any, any>;
  name: string;
}

export interface FormFieldControlGroupProps extends FieldControlGroupProps {
  element: FormFieldControlGroupElementProps;
}

export const FormFieldControlGroup = (props: FormFieldControlGroupProps) => {
  const { label, element, ...groupProps } = props;
  const { control, name, ...elementProps } = element;

  let {
    field: { ref, ...fieldProps },
    fieldState,
  } = useController({ control, name });

  const error: FieldFeedbackProps | undefined = fieldState.error && {
    type: 'invalid',
    message: fieldState.error.message,
  };

  const isInvalid = fieldState?.error ? true : false;

  return (
    <FieldControlGroup
      label={label}
      element={{ ...fieldProps, ...elementProps, isInvalid }}
      error={error}
      {...groupProps}
    />
  );
};
