import { LoadingOverlay } from '@mantine/core';

export const Loader = () => (
  <LoadingOverlay
    visible
    zIndex={1000}
    loaderProps={{ type: 'bars' }}
    overlayProps={{ radius: 'sm', blur: 2 }}
  />
);
