import {ChangeEvent, ComponentProps, useMemo} from 'react';

import './style.scss';

interface InputProps extends ComponentProps<'input'> {
  type: string;
  title: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors?: string[];
}

export const Input = ({
  type,
  title,
  value,
  onChange,
  errors,
  ...props
}: InputProps) => {
  const uniqueId = useMemo(() => `input_${Math.random()}`, []);
  return (
    <div className="input-container">
      <label htmlFor={uniqueId}>{title}</label>
      <input
        type={type}
        onChange={onChange}
        id={uniqueId}
        className="input"
        value={value}
        {...props}
      />
      {errors && <div className="error-text">{errors}</div>}
    </div>
  );
};
