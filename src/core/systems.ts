/**
 * What's do with dump of kills by last hour?
 * 1. Just mark it all as it was now. And after hour it will disappear.
 * 2. Other way - request all data by hash via ESI. But it looks like will leads to problems
 * */

import WebSocket from 'ws';

export type Kill = {
  timestamp: number;
  systemId: number;
  hash: string;
  esi: string;
  url: string;
};

class System {
  public systemId: number;
  public kills: Kill[] = [];
  protected hasDumpLoaded = false;

  constructor(systemId: number) {
    this.systemId = systemId;
  }

  init() {}

  count() {
    return this.kills.length;
  }

  add(kill: Kill) {
    if (!this.hasDumpLoaded) {
      return;
    }

    this.kills.push(kill);
  }
}

class Systems {
  public systems: Map<number, System> = new Map<number, System>();

  add(systemId: number) {
    if (!this.systems.has(systemId)) {
      const system = new System(systemId);
      this.systems.set(systemId, system);

      system.init();
    }

    // const sys = this.systems.get(systemId);
  }

  protected processKill(kill: Kill) {
    console.log(kill);
  }

  init() {
    const ws = new WebSocket('wss://zkillboard.com/websocket/');

    ws.on('open', function open() {
      console.log('Has open');
      ws.send('{"action":"sub","channel":"killstream"}');
      // ws.send('{"action":"sub","channel":"all:*"}');
    });

    ws.on('message', (data) => {
      const { locationID, hash, esi, url } = JSON.parse(data.toString()).zkb;
      const timestamp = +new Date();
      const kill = { systemId: locationID, hash, esi, url, timestamp };
      this.processKill(kill);
    });
  }
}

export const systems = new Systems();
