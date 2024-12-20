import { useMediaQuery } from '@mantine/hooks';

export const TruncateText = ({ text }: { text: string }) => {
  const matches = useMediaQuery('(max-width: 510px');
  return <>{matches ? `${text.substring(0, 4)}...` : text}</>;
};
