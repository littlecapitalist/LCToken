import { Box, Collapse, Group, Tabs, Title } from '@mantine/core';
import { IconCaretDown, IconCaretRight } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

import { LCTokenTradeSell } from './LCTokenTradeSell';
import { LCTokenSellOrders } from './LCTokenSellOrders';
import { LCTokenAllSellOrders } from './LCTokenAllSellOrders';

export const LCTokenSell = ({ address }: { address: string }) => {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <>
      <Box maw={400} mx="auto">
        <Group justify="space-between" mb={5} onClick={toggle}>
          <Title order={4}>Sell</Title> {opened ? <IconCaretDown /> : <IconCaretRight />}
        </Group>

        <Collapse in={opened} transitionDuration={1000} transitionTimingFunction="linear">
          <Tabs defaultValue="one">
            <Tabs.List>
              <Tabs.Tab value="one">Order</Tabs.Tab>
              <Tabs.Tab value="two">My Orders</Tabs.Tab>
              <Tabs.Tab value="three">All Orders</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="one" mt={20}>
              <LCTokenTradeSell address={address} />
            </Tabs.Panel>

            <Tabs.Panel value="two" mt={20}>
              <LCTokenSellOrders address={address} />
            </Tabs.Panel>

            <Tabs.Panel value="three" mt={20}>
              <LCTokenAllSellOrders address={address} />
            </Tabs.Panel>
          </Tabs>
        </Collapse>
      </Box>
    </>
  );
};
