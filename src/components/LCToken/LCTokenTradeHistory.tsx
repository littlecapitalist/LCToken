import { useEthers } from '@usedapp/core';
import { Box, Collapse, Grid, Group, Text, Title } from '@mantine/core';
import { Fragment } from 'react/jsx-runtime';
import { IconCaretDown, IconCaretRight } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { LCTokenShareAllEvents } from '../../hooks/LCToken/LCTokenShareTradeFunction';

export const LCTokenTradeHistory = ({ address }: { address: string }) => {
  const events = LCTokenShareAllEvents(address) || [[]];
  const { account } = useEthers();
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <>
      <Box maw={400} mx="auto">
        <Group justify="space-between" mb={10} onClick={toggle}>
          <Title order={4}>My Transactions</Title> {opened ? <IconCaretDown /> : <IconCaretRight />}
        </Group>

        <Collapse in={opened} transitionDuration={1000} transitionTimingFunction="linear">
          {events[0][0] !== undefined ? (
            <>
              <Grid>
                <Grid.Col span={3}>
                  <small>Date</small>
                </Grid.Col>
                <Grid.Col span={3}>
                  <small>ETH</small>
                </Grid.Col>
                <Grid.Col span={3}>
                  <small>Shares</small>
                </Grid.Col>
                <Grid.Col span={3}>
                  <small>Type</small>
                </Grid.Col>
                {events[0].map(
                  (data: any, index: any) =>
                    events[3][index] === account && (
                      <Fragment key={index}>
                        <Grid.Col span={3}>
                          <small>{Number(events[2][index])}</small>
                        </Grid.Col>
                        <Grid.Col span={3}>
                          <small>{Number(events[0][index]) / 1e18}</small>
                        </Grid.Col>
                        <Grid.Col span={3}>
                          <small>{Number(events[1][index])}</small>
                        </Grid.Col>
                        <Grid.Col span={3}>
                          <small>Sell</small>
                        </Grid.Col>
                      </Fragment>
                    )
                )}
                {events[0].map(
                  (data: any, index: any) =>
                    events[4][index] === account && (
                      <Fragment key={index}>
                        <Grid.Col span={3}>
                          <small>{Number(events[2][index])}</small>
                        </Grid.Col>
                        <Grid.Col span={3}>
                          <small>{Number(events[0][index]) / 1e18}</small>
                        </Grid.Col>
                        <Grid.Col span={3}>
                          <small>{Number(events[1][index])}</small>
                        </Grid.Col>
                        <Grid.Col span={3}>
                          <small>Buy</small>
                        </Grid.Col>
                      </Fragment>
                    )
                )}
              </Grid>
            </>
          ) : (
            <>
              <Text>No Transactions</Text>
            </>
          )}
        </Collapse>
      </Box>
    </>
  );
};
