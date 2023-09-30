export interface Keyboard {
  rows: KeyboardRow[];
}

export interface KeyboardRow {
  keys: KeyboardKey[];
}

export interface KeyboardKey {
  label: string;
  code: number;
  width?: number;
  height?: number;
  disabled?: boolean;
}
