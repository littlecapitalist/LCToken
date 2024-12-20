import { useConfig, useEthers } from '@usedapp/core';
import { ActionIcon, Button, Image, Popover, Stack, Tooltip } from '@mantine/core';
import wallet from '../Icons/wallet-62-64.png';

export const WalletSelect = () => {
  const { connectors } = useConfig();
  const { account, deactivate, activateBrowserWallet } = useEthers();

  return (
    <>
      {account ? (
        <Tooltip label="Deactivate Wallet">
          <ActionIcon variant="transparent" className="userLogin" onClick={() => deactivate()}>
            <Image src={wallet} w={30} />
          </ActionIcon>
        </Tooltip>
      ) : (
        <Tooltip label="Connect Wallet">
          <Popover trapFocus position="bottom" withArrow shadow="md">
            <Popover.Target>
              <ActionIcon variant="transparent" className="userLogin">
                <Image src={wallet} w={30} style={{ opacity: 0.4 }} />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <Stack>
                {Object.entries(connectors).map(([name]) => (
                  <Button onClick={() => activateBrowserWallet({ type: name })}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Button>
                ))}
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </Tooltip>
      )}
    </>
  );
};
