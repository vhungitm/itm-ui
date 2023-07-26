import { FieldIcon, FieldIconEndProps, FieldIconStartProps } from './FieldIcon';
import * as React from 'react';
import Select, { Props } from 'react-select';

export interface FieldSelectOptionsProps {
  label: string;
  value: any;
}

export type FieldSelectProps = Props & {
  isInvalid?: boolean;
  value?: any;
  size?: 'sm' | 'lg';
  iconStart?: FieldIconStartProps;
  iconEnd?: FieldIconEndProps;
  options?: FieldSelectOptionsProps[];
  onChange?: any;
};

export const FieldSelect = (props: FieldSelectProps) => {
  let {
    isInvalid,
    size,
    value,
    options = [],
    className,
    placeholder = '',
    iconStart,
    iconEnd,
    isMulti,
    onChange,
    ...selectProps
  } = props;

  let controlGroupClassName = 'field-select';
  if (size) controlGroupClassName += ` field-select-${size}`;
  if (iconStart) controlGroupClassName += ' icon-start';
  if (iconEnd) controlGroupClassName += ' icon-end';

  className = className
    ? `react-select-container ${className}`
    : 'react-select-container';
  className = size ? `${className} react-select-container-${size}` : className;

  if (isInvalid) className += ' is-invalid';

  const handleChange = (
    selectedValue: FieldSelectOptionsProps | FieldSelectOptionsProps[],
  ) => {
    if (onChange)
      onChange({
        target: {
          name: selectProps.name,
          value: isMulti
            ? (selectedValue as FieldSelectOptionsProps[]).map(
                (item: FieldSelectOptionsProps) => item.value,
              )
            : (selectedValue as FieldSelectOptionsProps).value,
        },
      });
  };

  const getValues = () => {
    if (isMulti) {
      if (value) {
        let result: FieldSelectOptionsProps[] = [];

        value.forEach((item: any) => {
          const optionItem: FieldSelectOptionsProps = options.find(
            (x: FieldSelectOptionsProps) => x.value === item,
          ) as FieldSelectOptionsProps;

          if (optionItem) result.push(optionItem);
        });

        return result;
      }
    } else {
      return options.find(
        (item: FieldSelectOptionsProps) => item.value === value,
      );
    }
  };

  return (
    <div className={controlGroupClassName}>
      {iconStart && <FieldIcon {...iconStart} name="iconStart" />}
      <Select
        value={getValues()}
        isMulti={isMulti}
        options={options}
        placeholder={placeholder}
        className={className}
        classNamePrefix="react-select"
        noOptionsMessage={() => 'Không có'}
        onChange={handleChange}
        {...selectProps}
      />
      {iconEnd && <FieldIcon {...iconEnd} name="iconEnd" />}
    </div>
  );
};
