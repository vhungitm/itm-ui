import * as React from 'react';
import { FormControl, FormControlProps } from 'react-bootstrap';
import { FieldIcon, FieldIconEndProps, FieldIconStartProps } from './FieldIcon';

export interface FieldControlProps extends FormControlProps {
  iconStart?: FieldIconStartProps;
  iconEnd?: FieldIconEndProps;
}

export const FieldControl = (props: FieldControlProps) => {
  let { size, iconStart, iconEnd, ...controlProps } = props;

  let controlGroupClassName = 'field-control';
  if (size) controlGroupClassName += ` field-control-${size}`;
  if (iconStart) controlGroupClassName += ' icon-start';
  if (iconEnd) controlGroupClassName += ' icon-end';

  return (
    <div className={controlGroupClassName}>
      {iconStart && <FieldIcon {...iconStart} name="iconStart" />}
      <FormControl size={size} {...controlProps} />
      {iconEnd && <FieldIcon {...iconEnd} name="iconEnd" />}
    </div>
  );
};
