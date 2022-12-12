import { ReactNode } from 'react';
import LoadingOverlay from 'react-loading-overlay-ts';

export default function MyLoader({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) {
  return (
    <LoadingOverlay
      className="fixed w-full h-full top-0 left-0 overflow-auto"
      styles={{
        overlay: (base) => ({
          ...base,
          zIndex: '1000',
          position: 'fixed',
        }),
      }}
      active={active}
    >
      {children}
    </LoadingOverlay>
  );
}
