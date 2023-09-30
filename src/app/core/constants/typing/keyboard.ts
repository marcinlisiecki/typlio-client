import { Keyboard } from '@core/interfaces/typing/keyboard/keyboard';

export const KEY_WIDTH_BASE = 64;
export const KEY_HEIGHT_BASE = 64;

export const DEFAULT_KEY_WIDTH = KEY_WIDTH_BASE;
export const DEFAULT_KEY_HEIGHT = KEY_HEIGHT_BASE;
const BACKSPACE_WIDTH = 2 * KEY_WIDTH_BASE;
const TAB_WIDTH = 1.5 * KEY_WIDTH_BASE;
const CAPS_LOCK_WIDTH = 1.81 * KEY_WIDTH_BASE;
const ENTER_WIDTH = 2.31 * KEY_WIDTH_BASE;
const BACK_SLASH_WIDTH = 1.5 * KEY_WIDTH_BASE;
const LEFT_SHIFT_WIDTH = 2.36 * KEY_WIDTH_BASE;
const RIGHT_SHIFT_WIDTH = 2.86 * KEY_WIDTH_BASE;
const LEFT_CTRL_WIDTH = 1.5 * KEY_WIDTH_BASE;
const LEFT_ALT_WIDTH = 1.5 * KEY_WIDTH_BASE;
const SPACE_WIDTH = 10.1 * KEY_WIDTH_BASE;
const RIGHT_ALT_WIDTH = 1.5 * KEY_WIDTH_BASE;
const RIGHT_CTRL_WIDTH = 1.5 * KEY_WIDTH_BASE;

export const KEYBOARD: Keyboard = {
  rows: [
    {
      keys: [
        { value: '~' },
        { value: '1' },
        { value: '2' },
        { value: '3' },
        { value: '4' },
        { value: '5' },
        { value: '6' },
        { value: '7' },
        { value: '8' },
        { value: '9' },
        { value: '0' },
        { value: '-' },
        { value: '=' },
        { value: 'Backspace', width: BACKSPACE_WIDTH, disabled: true },
      ],
    },
    {
      keys: [
        { value: 'Tab', width: TAB_WIDTH, disabled: true },
        { value: 'Q' },
        { value: 'W' },
        { value: 'E' },
        { value: 'R' },
        { value: 'T' },
        { value: 'Y' },
        { value: 'U' },
        { value: 'I' },
        { value: 'O' },
        { value: 'P' },
        { value: '[' },
        { value: ']' },
        { value: '\\', width: BACK_SLASH_WIDTH },
      ],
    },
    {
      keys: [
        { value: 'Caps Lock', width: CAPS_LOCK_WIDTH, disabled: true },
        { value: 'A' },
        { value: 'S' },
        { value: 'D' },
        { value: 'F' },
        { value: 'G' },
        { value: 'H' },
        { value: 'J' },
        { value: 'K' },
        { value: 'L' },
        { value: ';' },
        { value: "'" },
        { value: 'Enter', width: ENTER_WIDTH, disabled: true },
      ],
    },
    {
      keys: [
        { value: 'Shift', width: LEFT_SHIFT_WIDTH, disabled: true },
        { value: 'Z' },
        { value: 'X' },
        { value: 'C' },
        { value: 'V' },
        { value: 'B' },
        { value: 'N' },
        { value: 'M' },
        { value: ',' },
        { value: '.' },
        { value: '/' },
        { value: 'Shift', width: RIGHT_SHIFT_WIDTH, disabled: true },
      ],
    },
    {
      keys: [
        { value: 'Ctrl', width: LEFT_CTRL_WIDTH, disabled: true },
        { value: 'Alt', width: LEFT_ALT_WIDTH, disabled: true },
        { value: ' ', width: SPACE_WIDTH },
        { value: 'Alt', width: RIGHT_ALT_WIDTH, disabled: true },
        { value: 'Ctrl', width: RIGHT_CTRL_WIDTH, disabled: true },
      ],
    },
  ],
};
