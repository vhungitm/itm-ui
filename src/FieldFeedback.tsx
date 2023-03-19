import * as React from 'react';
import { FormControl } from 'react-bootstrap';
import { FeedbackProps } from 'react-bootstrap/esm/Feedback';

export interface FieldFeedbackProps extends FeedbackProps {
  message?: string;
}

export const FieldFeedback = (props: FieldFeedbackProps) => {
  const { message, ...feedbackProps } = props;

  return (
    <FormControl.Feedback {...feedbackProps}>{message}</FormControl.Feedback>
  );
};
