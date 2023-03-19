import * as React from 'react';
import { FormGroupProps } from 'react-bootstrap';
import { FieldControl, FieldControlProps } from './FieldControl';
import { FieldFeedback, FieldFeedbackProps } from './FieldFeedback';
import { FieldLabel, FieldLabelProps } from './FieldLabel';

export interface FieldControlGroupProps extends FormGroupProps {
  label?: FieldLabelProps;
  element: FieldControlProps;
  error?: FieldFeedbackProps;
}

export const FieldControlGroup = (props: FieldControlGroupProps) => {
  let { label, element, error, ...groupProps } = props;

  return (
    <div {...groupProps}>
      {label && <FieldLabel {...label} />}
      <FieldControl {...element} />
      {error && <FieldFeedback {...error} />}
    </div>
  );
};
