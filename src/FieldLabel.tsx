import * as React from 'react';
import { FormLabel } from 'react-bootstrap';
import {
  FormLabelOwnProps,
  FormLabelWithColProps,
} from 'react-bootstrap/esm/FormLabel';

export interface FieldLabelBaseProps {
  element: any;
  required?: boolean;
}

export interface FieldLabelOwnProps
  extends FormLabelOwnProps,
    FieldLabelBaseProps {}
export interface FieldLabelWithColProps
  extends FormLabelWithColProps,
    FieldLabelBaseProps {}

export type FieldLabelProps = FieldLabelOwnProps | FieldLabelWithColProps;

export const FieldLabel = (props: FieldLabelProps) => {
  const { element, required, ...labelProps } = props;

  return (
    <FormLabel as="div" {...labelProps}>
      {element}
      {required && <span className="text-danger"> * </span>}
    </FormLabel>
  );
};
