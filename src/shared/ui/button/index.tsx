import {ComponentProps, ReactNode} from 'react';

import './style.scss';

interface ButtonProps extends ComponentProps<'button'> {
  type: 'button' | 'submit' | 'reset';
  loading: boolean;
  children?: ReactNode;
}

export const Button = ({type, loading, children, ...props}: ButtonProps) => {
  return (
    <button type={type} {...props} className="button">
      {loading ? 'loading' : children}
    </button>
  );
};
