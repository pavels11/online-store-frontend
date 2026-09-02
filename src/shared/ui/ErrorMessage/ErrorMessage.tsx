import type { ReactNode } from 'react';

import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
  action?: ReactNode;
}

function ErrorMessage({ message, action }: ErrorMessageProps) {
  return (
    <div className={styles.error} role="alert">
      <p className={styles.message}>{message}</p>

      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}

export default ErrorMessage;
