import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children, document.querySelector("#portalParent")!)
    : null;
};

export default Portal;
