/* eslint-disable no-restricted-syntax */
import { Anchor, Badge, Grid, Group, Text, Title } from '@mantine/core';
import { useEthers, useLogs } from '@usedapp/core';
import { useMemo } from 'react';
import { WalletSelect } from '../WalletSelect/WalletSelect';
import { TruncateText } from '../Truncate/TruncateText';
import {
  useLCTokenNFTAllData,
  LCTokenNFTInterface,
  useLCTokenNFTContract,
} from '../../hooks/LCTokenNFT/LCTokenNFT';
import { Loader } from '../Loader/Loader';
import { LCTokenNFTmeta } from './LCTokenNFTmeta';

export const LCTokenNFT = ({ address, local = false }: { address: string; local?: boolean }) => {
  const { account } = useEthers();
  // const isConnected = account !== undefined;
  const token: LCTokenNFTInterface | undefined = useLCTokenNFTAllData(address);
  const ethscanAddress = `https://etherscan.io/address/${address}`;

  const LCTokenContract = useLCTokenNFTContract(address);
  const sentLogs = useLogs({
    contract: LCTokenContract,
    event: 'Transfer',
    args: [account, null],
  });

  const receivedLogs = useLogs({
    contract: LCTokenContract,
    event: 'Transfer',
    args: [null, account],
  });

  const owned = useMemo(() => {
    if (account) {
      const logs =
        sentLogs?.value && receivedLogs?.value
          ? sentLogs.value
              .concat(receivedLogs.value)
              .sort(
                (a, b) => a.blockNumber - b.blockNumber || a.transactionIndex - b.transactionIndex
              )
          : [];

      const own = new Set();
      const addressEqual = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();
      for (const item of logs) {
        if (item.data) {
          if (addressEqual(item.data.to, account)) {
            own.add(item.data.tokenId.toString());
          } else if (addressEqual(item.data.from, account)) {
            own.delete(item.data.tokenId.toString());
          }
        }
      }
      return own;
    }
    return new Set();
  }, [account, sentLogs, receivedLogs]);
  return (
    <>
      <Grid gutter="md">
        <Grid.Col span={12}>
          {token ? (
            <>
              <Group justify="space-between" mb={20}>
                <Badge>NFT</Badge>

                {token && account && owned && owned.size > 0 && (
                  <Text variant="body1">
                    Owner of {owned.size} NFT Token{owned.size > 0 && 's'}
                  </Text>
                )}
                {local && <WalletSelect />}
              </Group>
              <Group justify="space-between" mb={20}>
                <Title order={3}>
                  {token?.symbol} : {token?.name}
                </Title>
                <Anchor target="_blank" href={ethscanAddress}>
                  <TruncateText text={address} />
                </Anchor>
              </Group>
            </>
          ) : (
            <Loader />
          )}
        </Grid.Col>
        {token && <LCTokenNFTmeta address={address} token={token} owned={owned} />}
      </Grid>
    </>
  );
};
