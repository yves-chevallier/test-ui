import type { Command, DataPayload, NamedSDO, ObjectEntry } from './schema';

type Listener = (data: DataPayload) => void;

const namedSDOMap: Record<NamedSDO, [number, number]> = {
  statusword: [0x6041, 0],
  controlword: [0x6040, 0],
  modeOfOperation: [0x6060, 0],
  targetPosition: [0x607a, 0],
  profileVelocity: [0x6081, 0],
  profileAcceleration: [0x6083, 0],
  profileDeceleration: [0x6084, 0],
};

export class WebSocketClient {
  private socket: WebSocket | null = null;
  private listener: Listener | null = null;

  connect(url: string, nodeId: number) {
    this.socket = new WebSocket(url);
    this.socket.onmessage = event => {
      if (this.listener) {
        const data: DataPayload = JSON.parse(event.data);
        this.listener(data);
      }
    };

    this.socket.onopen = () => {
      this.send({ command: 'connect', node_id: nodeId });
    };
  }

  disconnect() {
    this.send({ command: 'disconnect' });
    this.socket?.close();
    this.socket = null;
  }

  onMessage(cb: Listener) {
    this.listener = cb;
  }

  readSDO(input: NamedSDO | [number, number]) {
    const obj = this.resolveObject(input);
    this.send({ command: 'read', object: obj });
  }

  writeSDO(input: NamedSDO | [number, number], value: number | string | boolean) {
    const obj = this.resolveObject(input);
    this.send({ command: 'write', object: obj, value });
  }

  bind(objects: (NamedSDO | [number, number])[]) {
    const mapped = objects.map(o => this.resolveObject(o));
    this.send({ command: 'bind', objects: mapped });
  }

  clear() {
    this.send({ command: 'clear' });
  }

  private resolveObject(input: NamedSDO | [number, number]): ObjectEntry {
    if (typeof input === 'string') {
      const [index, subindex] = namedSDOMap[input];
      return { name: input, index, subindex };
    } else {
      const [index, subindex] = input;
      return { index, subindex };
    }
  }

  private send(payload: Command) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(payload));
    } else {
      console.warn('WebSocket not open. Cannot send:', payload);
    }
  }
}
