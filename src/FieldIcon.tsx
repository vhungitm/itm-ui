import * as React from 'react';
import { HTMLAttributes } from 'react';

export interface FieldIconCSSProps extends HTMLAttributes<HTMLElement> {
  type: 'css';
  className: string;
}

export interface FieldIconImgProps extends HTMLAttributes<HTMLElement> {
  type: 'img';
  src: string;
}

export type FieldIconStartProps = (FieldIconCSSProps | FieldIconImgProps) & {
  name?: 'iconStart';
};

export type FieldIconEndProps = (FieldIconCSSProps | FieldIconImgProps) & {
  name?: 'iconEnd';
};

export type FieldIconProps = FieldIconStartProps | FieldIconEndProps;

export const FieldIcon = (props: FieldIconProps) => {
  let { name = 'iconEnd', type = 'css', className, ...iconProps } = props;

  className =
    type === 'css'
      ? name === 'iconEnd'
        ? `icon-end ${className}`
        : `icon-start ${className}`
      : name === 'iconEnd'
      ? 'icon-end'
      : 'icon-start';

  const imgTypeJSX = <img className={className} alt={name} {...iconProps} />;
  const cssTypeJSX = <div className={className} {...iconProps} />;
  const JSX = type === 'img' ? imgTypeJSX : cssTypeJSX;

  return JSX;
};
