import { flushdb, mget, mset, scan } from '../src';
import { nanoid } from 'nanoid';

describe('scan command', () => {
  it('basic', async () => {
    await flushdb();

    await mset(['key1', '1', 'key2', '2']);

    const { data } = await scan(0);
    expect(data[0]).toBe('0');
    expect(data[1].length).toBeGreaterThanOrEqual(2);
  });

  it('with match', async () => {
    await flushdb();

    await mset(['key1', '1', 'key2', '2', 'mykey1', '3']);

    const { data } = await scan(0, { match: 'key*' });
    expect(data[0]).toBe('0');
    expect(data[1].length).toBeGreaterThanOrEqual(2);
  });

  it('with count', async () => {
    await flushdb();

    await mset(['key1', '1', 'key2', '2']);

    const { data } = await scan(0, { count: 1 });
    expect(data[0]).toBe('1');
    expect(data[1].length).toBeGreaterThanOrEqual(1);
  });

  it('with match and count', async () => {
    await flushdb();

    await mset(['key1', '1', 'key2', '2', 'mykey1', '3']);

    const { data } = await scan(0, { match: 'key*', count: 1 });
    expect(data[0]).toBe('1');
    expect(data[1].length).toBeGreaterThanOrEqual(1);
  });
});
