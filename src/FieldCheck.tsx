import * as React from 'react';
import { ChangeEvent } from 'react';
import { FormCheck, FormCheckProps } from 'react-bootstrap';

export interface FieldCheckOptionsProps {
  label: string;
  value: boolean | string | number;
}

export interface FieldCheckProps extends FormCheckProps {
  name?: string;
  type?: 'radio' | 'checkbox' | 'switch';
  value?: any;
  options?: FieldCheckOptionsProps[];
  groupValue?: any;
  setGroupValue?: any;
}

export const FieldCheck = (props: FieldCheckProps) => {
  const {
    name,
    type = 'checkbox',
    value = true,
    options = [],
    groupValue,
    setGroupValue = () => {},
    ...checkProps
  } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value: eventValue, checked } = e.target;

    setGroupValue(
      checked
        ? type === 'radio'
          ? eventValue
          : options.length >= 2
          ? [...groupValue, eventValue]
          : true
        : options.length >= 2
        ? groupValue.filter(
            (item: string) => item.toString() !== eventValue.toString(),
          )
        : false,
    );
  };

  return (
    <FormCheck
      name={name}
      type={type}
      value={
        type === 'radio' ? value : options.length >= 2 ? value : Boolean(value)
      }
      checked={
        type === 'radio'
          ? groupValue !== undefined && groupValue !== null
            ? groupValue.toString() === value.toString()
            : groupValue
          : options.length >= 2
          ? groupValue.findIndex(
              (item: string) => item.toString() === value.toString(),
            ) >= 0
          : groupValue
      }
      onChange={setGroupValue && handleChange}
      {...checkProps}
    />
  );
};
