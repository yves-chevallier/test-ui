export type NamedSDO =
    | 'statusword'
    | 'controlword'
    | 'modeOfOperation'
    | 'targetPosition'
    | 'profileVelocity'
    | 'profileAcceleration'
    | 'profileDeceleration';

export interface ObjectEntry {
    index: number;
    subindex?: number;
    name?: NamedSDO;
}

export type Command =
    | { command: 'connect'; node_id: number }
    | { command: 'disconnect' }
    | { command: 'read'; object: ObjectEntry }
    | { command: 'write'; object: ObjectEntry; value: number | string | boolean }
    | { command: 'bind'; objects: ObjectEntry[] }
    | { command: 'clear' };

export interface SDOData {
    object: ObjectEntry;
    value: number | string | boolean | null;
}

export interface DataPayload {
    sdo?: SDOData[];
    pdo?: (number | string | boolean)[];
    status?: string;
    error?: string;
    pdo_config?: ObjectEntry[];
}

export const Prout = 42;

export const __force_module__ = true;
