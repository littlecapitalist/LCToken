import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';

import {
  CoinbaseWalletConnector,
  Config,
  DAppProvider,
  Hardhat,
  Mainnet,
  MetamaskConnector,
} from '@usedapp/core';
// import { WalletConnectV2Connector } from '@usedapp/wallet-connect-v2-connector';
// import { PortisConnector } from '@usedapp/portis-connector';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Router } from './Router';
import { theme } from './theme';

//const PORTIS_DAPP_ID = '';
const config: Config = {
  networks: [Hardhat, Mainnet],
  readOnlyChainId: Hardhat.chainId,
  readOnlyUrls: {
    [Hardhat.chainId]: 'http://127.0.0.1:8545',
    [Mainnet.chainId]: `${import.meta.env.VITE_INFURA_API}${import.meta.env.VITE_INFURA_API_KEY}`,
  },
  multicallVersion: 2 as const,
  fastMulticallEncoding: true,
  noMetamaskDeactivate: true,
  connectors: {
    metamask: new MetamaskConnector(),
    coinbase: new CoinbaseWalletConnector(),
    /* 
    portis: new PortisConnector(PORTIS_DAPP_ID, 'mainnet'),
    walletConnectV2: new WalletConnectV2Connector({
      projectId: '9b18963ac1e9f509a83294be58755fa0',
      chains: [Mainnet],
      rpcMap: {
        [Mainnet.chainId]: import.meta.env.VITE_INFURA_API + import.meta.env.VITE_INFURA_API_KEY,
      },
    }),
    */
  },
};

export default function App() {
  return (
    <DAppProvider config={config}>
      <MantineProvider theme={theme}>
        <Notifications />
        <Router />
      </MantineProvider>
    </DAppProvider>
  );
}
