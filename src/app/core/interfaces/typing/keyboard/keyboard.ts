export interface Keyboard {
  rows: KeyboardRow[];
}

export interface KeyboardRow {
  keys: KeyboardKey[];
}

export interface KeyboardKey {
  value: string;
  width?: number;
  height?: number;
  disabled?: boolean;
}
