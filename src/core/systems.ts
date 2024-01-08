/**
 * What's do with dump of kills by last hour?
 * 1. Just mark it all as it was now. And after hour it will disappear.
 * 2. Other way - request all data by hash via ESI. But it looks like will leads to problems
 * */

import WebSocket from 'ws';
import { Kill } from '../types';
import { System } from './system';
import { RECYCLE_SYSTEM_TIMEOUT, SOCKET_RECONNECT_INTERVAL } from '../constants';

export class Systems {
  public systems: Map<number, System> = new Map<number, System>();
  protected wsSocket: WebSocket;

  init() {
    this.initZkbSocket();
    this.initRecycler();
  }

  initZkbSocket() {
    this.createSocketConnection();

    setInterval(() => {
      this.wsSocket.close();
      this.createSocketConnection();
    }, SOCKET_RECONNECT_INTERVAL);
  }

  initRecycler() {
    setInterval(() => {
      const forRemove: number[] = [];

      this.systems.forEach((system) => {
        system.recycle();
        if (system.count() === 0) {
          forRemove.push(system.systemId);
        }
      });

      forRemove.forEach((x) => {
        this.systems.delete(x);
      });
    }, RECYCLE_SYSTEM_TIMEOUT);
  }

  createSocketConnection() {
    const ws = new WebSocket('wss://zkillboard.com/websocket/');

    ws.on('open', function open() {
      console.log('Has open');
      ws.send('{"action":"sub","channel":"killstream"}');
    });

    ws.on('message', (data) => {
      try {
        const {
          zkb: { hash, esi, url },
          solar_system_id,
        } = JSON.parse(data.toString());
        const timestamp = +new Date();
        const kill = { systemId: solar_system_id, hash, esi, url, timestamp };
        this.processKill(kill);
      } catch (err) {
        // do nothing
      }
    });

    this.wsSocket = ws;
  }

  protected processKill(kill: Kill) {
    console.log(kill);
    const sys = this.add(kill.systemId);
    sys.add({
      ...kill,
      humanDate: new Date(kill.timestamp).toUTCString(),
    });
  }

  add(systemId: number) {
    if (this.systems.has(systemId)) {
      return this.systems.get(systemId);
    }

    const system = new System(systemId);
    this.systems.set(systemId, system);

    return system;
  }

  getKillsBySystem(systemId: number) {
    if (!this.systems.has(systemId)) {
      return [];
    }

    return this.systems.get(systemId).kills;
  }
}
