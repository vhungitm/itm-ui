import * as React from 'react';
import { useState } from 'react';
import { Button, ButtonProps, OverlayTrigger, Tooltip } from 'react-bootstrap';

export interface ButtonCircleProps extends ButtonProps {
  icon: any;
  title: string;
}

export const ButtonCircle = (props: ButtonCircleProps) => {
  let { icon, title, className, ...buttonProps } = props;
  className = 'btn-circle' + (className ? ` ${className}` : '');

  // Show tooltip
  const [ShowToolTip, setShowToolTip] = useState(false);

  return (
    <OverlayTrigger
      show={ShowToolTip}
      placement="bottom"
      overlay={<Tooltip>{title}</Tooltip>}
    >
      <Button
        className={className}
        {...buttonProps}
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
      >
        {icon}
      </Button>
    </OverlayTrigger>
  );
};
