import { Container } from '@mantine/core';
import { LCToken } from '../components/LCToken/LCToken';
import { LCTokenNFT } from '../components/LCTokenNFT/LCTokenNFT';

export function HomePage() {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const type = import.meta.env.VITE_CONTRACT_TYPE;
  return (
    <Container mt={20}>
      {type === 'Token' && <LCToken address={contractAddress} local />}
      {type === 'NFT' && <LCTokenNFT address={contractAddress} local />}
    </Container>
  );
}
