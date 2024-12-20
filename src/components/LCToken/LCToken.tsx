import { useEthers } from '@usedapp/core';
import {
  Anchor,
  Grid,
  Title,
  Text,
  Group,
  Badge,
  Alert,
  GridCol,
  NumberFormatter,
} from '@mantine/core';

import { LCTokenTradeHistory } from './LCTokenTradeHistory';
import { LCTokenContract } from './LCTokenContract';
import { LCTokenAllData, LCTokenInterface } from '../../hooks/LCToken/LCToken';

import { LCTokenChart } from './LCTokenChart';
import { LCTokenBuy } from './LCTokenBuy';
import { LCTokenSell } from './LCTokenSell';
import { LCTokenMetaData } from './LCTokenMetData';
import { TruncateText } from '../Truncate/TruncateText';
import { WalletSelect } from '../WalletSelect/WalletSelect';

export const LCToken = ({ address, local = false }: { address: string; local?: boolean }) => {
  const { account } = useEthers();
  const isConnected = account !== undefined;
  const token: LCTokenInterface | undefined = LCTokenAllData(address);

  const ethscanAddress = `https://etherscan.io/address/${address}`;

  return (
    <>
      <div>
        <Grid gutter="md">
          <Grid.Col span={12}>
            {token && token.getContractSalePrice ? (
              <>
                <Group justify="space-between" mb={20}>
                  <Badge>{Number(token.getContractSalePrice) / 1e18} ETH</Badge>

                  {token && token?.owners && token.owners[token.owners.length - 1] === account && (
                    <Text variant="body1">Owner</Text>
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
                <LCTokenChart address={address} token={token} />
              </>
            ) : (
              <>Loading</>
            )}
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 6 }}>
            {token && token.getSharePrice ? (
              <>
                <Grid>
                  <Grid.Col span={12}>
                    <Title order={4}>Token/Share</Title>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Text>Name</Text>
                  </Grid.Col>
                  <Grid.Col span={9}>
                    <Text>{token?.name}</Text>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Text>Symbol</Text>
                  </Grid.Col>
                  <Grid.Col span={9}>
                    <Text>{token?.symbol}</Text>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Text>Price</Text>
                  </Grid.Col>
                  <Grid.Col span={9}>
                    <Text>
                      <NumberFormatter
                        value={Number(token?.getSharePrice) / 1e18}
                        decimalScale={10}
                        suffix=" ETH"
                      />
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Text>Supply</Text>
                  </Grid.Col>
                  <Grid.Col span={9}>
                    <Text>{Number(token?.totalSupply)}</Text>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Text>Decimals</Text>
                  </Grid.Col>
                  <Grid.Col span={9}>
                    <Text>{Number(token?.decimals)}</Text>
                  </Grid.Col>
                  {token.isForSale && (
                    <GridCol>
                      <Badge> FOR SALE </Badge>
                    </GridCol>
                  )}
                </Grid>
                <LCTokenMetaData url={token.tokenMeta.mediaDataPackURI} />
              </>
            ) : (
              <>Loading</>
            )}
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 6 }}>
            {token && isConnected && (
              <>
                <LCTokenContract address={address} token={token} />

                <Alert color="gray" mb={20}>
                  <LCTokenBuy address={address} />
                </Alert>
                <Alert color="gray" mb={20}>
                  <LCTokenSell address={address} />
                </Alert>
                <Alert color="gray" mb={20}>
                  <LCTokenTradeHistory address={address} />
                </Alert>
              </>
            )}
          </Grid.Col>
        </Grid>
      </div>
    </>
  );
};
