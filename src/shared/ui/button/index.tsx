import {ComponentProps, ReactNode} from 'react';

import './style.scss';

interface ButtonProps extends ComponentProps<'button'> {
  loading: boolean;
  children?: ReactNode;
}

export const Button = ({loading, children, ...props}: ButtonProps) => {
  return (
    <button {...props} className="button">
      {loading ? 'loading' : children}
    </button>
  );
};
