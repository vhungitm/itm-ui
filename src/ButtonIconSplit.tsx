import * as React from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import { FieldIcon, FieldIconEndProps, FieldIconStartProps } from './FieldIcon';

export interface ButtonIconSplitProps extends ButtonProps {
  iconStart: FieldIconStartProps;
  iconEnd?: FieldIconEndProps;
  element: any;
}

export const ButtonIconSplit = (props: ButtonIconSplitProps) => {
  let { iconStart, iconEnd, element, className, ...buttonProps } = props;
  className = className ? `btn-icon-split ${className}` : 'btn-icon-split';

  return (
    <Button {...buttonProps} className={className}>
      <div className="icon">
        <FieldIcon {...iconStart} name="iconStart" />
      </div>
      <div className="content">{element}</div>
      {iconEnd && <FieldIcon {...iconStart} name="iconEnd" />}
    </Button>
  );
};
