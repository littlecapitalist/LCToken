import { CompositeChart } from '@mantine/charts';
import { Text } from '@mantine/core';
import { useMemo } from 'react';
import moment from 'moment';
import { LCTokenShareAllEvents } from '../../hooks/LCToken/LCTokenShareTradeFunction';
import { LCTokenInterface } from '../../hooks/LCToken/LCToken';

export const LCTokenChart = ({ address, token }: { address: string; token: LCTokenInterface }) => {
  const events = LCTokenShareAllEvents(address) || [[]];
  const data = useMemo(() => {
    if (!events[0].length) {
      const price = Number(token.getSharePrice) / 1e18;
      return [
        {
          date: new Date().toLocaleDateString('en-GB'),
          price,
          low: price,
          high: price,
          volume: Number(token.totalSupply),
        },
      ];
    }
    const _data = [];
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const x in events[0]) {
      console.log(new Date(Number(events[2][x])), Number(events[2][x]), events[2][x]);
      _data.push({
        date: moment(events[2][x]).format('DD-MM-YYYY'),
        low: Number(events[0][x]) / 1e18,
        high: Number(events[0][x]) / 1e18,
        price: Number(events[0][x]) / 1e18,
        volume: Number(events[1][x]),
      });
    }
    //
    const out = [];
    const last = {
      date: '1/1/1900',
      high: 0,
      low: 0,
      price: 0,
      volume: 0,
    };
    // eslint-disable-next-line no-restricted-syntax
    for (const x in _data) {
      if (last.date !== _data[x].date) {
        last.date = _data[x].date;
        if (last.high < _data[x].price) {
          last.high = _data[x].price;
        }
        if (last.low === 0 || last.low > _data[x].price) {
          last.low = _data[x].price;
        }
        last.volume += _data[x].volume;

        if (
          _data[Number(x) + 1] &&
          (_data[x].date !== _data[Number(x) + 1].date || Number(x) + 1 === data.length)
        ) {
          out.push({ ...last });
          last.high = 0;
          last.low = 0;
          last.price = 0;
          last.volume = 0;
        }
        if (!_data[Number(x) + 1]) {
          out.push({ ...last });
        }
      }
    }

    return out;
  }, []);
  return (
    <>
      <Text mb="md" mt="md">
        Price
      </Text>
      <CompositeChart
        h={300}
        data={data}
        w="100%"
        dataKey="date"
        series={[{ name: 'high', color: 'indigo.6', type: 'line' }]}
      />
      <Text mb="md" mt="md">
        Volume
      </Text>

      <CompositeChart
        h={180}
        data={data}
        dataKey="date"
        composedChartProps={{ syncId: 'date' }}
        series={[{ name: 'volume', color: 'cyan.6', type: 'bar' }]}
      />
    </>
  );
};
