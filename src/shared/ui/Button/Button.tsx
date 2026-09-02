import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ children, className, ...props }: ButtonProps) {
  const buttonClassName = [styles.button, className].filter(Boolean).join(' ');

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
}

export default Button;
