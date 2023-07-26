import * as React from 'react';
import { Control, useController } from 'react-hook-form';
import { FieldEditorProps } from './FieldEditor';
import { FieldEditorGroup, FieldEditorGroupProps } from './FieldEditorGroup';
import { FieldFeedbackProps } from './FieldFeedback';

export interface FormFieldEditorGroupElementProps extends FieldEditorProps {
  control: Control<any, any>;
  name: string;
}

export interface FormFieldEditorGroupProps extends FieldEditorGroupProps {
  element: FormFieldEditorGroupElementProps;
}

export const FormFieldEditorGroup = (props: FormFieldEditorGroupProps) => {
  const { label, element, ...groupProps } = props;
  const { control, name, ...elementProps } = element;

  let {
    field: { value, ref, onChange, ...fieldProps },
    fieldState,
  } = useController({ control, name });

  const error: FieldFeedbackProps | undefined = fieldState.error && {
    type: 'invalid',
    message: fieldState.error.message,
  };

  const isInvalid = fieldState?.error ? true : false;

  const handleChange: any = (e: any, editor: any) => {
    e;
    onChange(editor.getData());
  };

  return (
    <FieldEditorGroup
      label={label}
      element={{
        ...fieldProps,
        ...elementProps,
        data: value,
        onChange: handleChange,
        isInvalid,
      }}
      error={error}
      {...groupProps}
    />
  );
};
