import * as React from 'react';
import { FormGroupProps } from 'react-bootstrap';
import { FieldEditor, FieldEditorProps } from './FieldEditor';
import { FieldFeedback, FieldFeedbackProps } from './FieldFeedback';
import { FieldLabel, FieldLabelProps } from './FieldLabel';

export interface FieldEditorGroupProps extends FormGroupProps {
  label?: FieldLabelProps;
  element: FieldEditorProps;
  error?: FieldFeedbackProps;
}

export const FieldEditorGroup = (props: FieldEditorGroupProps) => {
  let { label, element, error, ...groupProps } = props;

  return (
    <div {...groupProps}>
      {label && <FieldLabel {...label} />}
      <FieldEditor {...element} />
      {error && <FieldFeedback {...error} />}
    </div>
  );
};
