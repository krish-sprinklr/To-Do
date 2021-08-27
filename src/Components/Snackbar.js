import React from "react";

const Snackbar = React.memo((props) => {
  const { open, close, type, children, delay } = props;
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      close();
    }, delay || 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [close, open, delay]);
  return open ? (
    <p id="snackbar" aria-label="snackbar" className={`bg-${type}`}>
      {children}
    </p>
  ) : null;
});

export default Snackbar;
