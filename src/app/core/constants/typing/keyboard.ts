import { Keyboard } from '@core/interfaces/typing/keyboard/keyboard';

export const KEY_WIDTH_BASE = 72;
export const KEY_HEIGHT_BASE = 72;

// export const DEFAULT_KEY_WIDTH = KEY_WIDTH_BASE;
// export const DEFAULT_KEY_HEIGHT = KEY_HEIGHT_BASE;
// const BACKSPACE_WIDTH = 2 * KEY_WIDTH_BASE;
// const TAB_WIDTH = 1.5 * KEY_WIDTH_BASE;
// const CAPS_LOCK_WIDTH = 1.81 * KEY_WIDTH_BASE;
// const ENTER_WIDTH = 2.31 * KEY_WIDTH_BASE;
// const BACK_SLASH_WIDTH = 1.5 * KEY_WIDTH_BASE;
// const LEFT_SHIFT_WIDTH = 2.36 * KEY_WIDTH_BASE;
// const RIGHT_SHIFT_WIDTH = 2.86 * KEY_WIDTH_BASE;
// const LEFT_CTRL_WIDTH = 1.5 * KEY_WIDTH_BASE;
// const LEFT_ALT_WIDTH = 1.5 * KEY_WIDTH_BASE;
// const SPACE_WIDTH = 10.1 * KEY_WIDTH_BASE;
// const RIGHT_ALT_WIDTH = 1.5 * KEY_WIDTH_BASE;
// const RIGHT_CTRL_WIDTH = 1.5 * KEY_WIDTH_BASE;

const KEY_WIDTH_PERCENT_BASE = 100.0 / 15.0;

export const DEFAULT_KEY_WIDTH = KEY_WIDTH_PERCENT_BASE;
export const DEFAULT_KEY_HEIGHT = KEY_HEIGHT_BASE;

const BACKSPACE_WIDTH = KEY_WIDTH_PERCENT_BASE * 2;

const TAB_WIDTH = KEY_WIDTH_PERCENT_BASE * 1.5;
const BACK_SLASH_WIDTH = KEY_WIDTH_PERCENT_BASE * 1.5;

const CAPS_LOCK_WIDTH = KEY_WIDTH_PERCENT_BASE * 1.75;
const ENTER_WIDTH = KEY_WIDTH_PERCENT_BASE * 2.25;

const LEFT_SHIFT_WIDTH = KEY_WIDTH_PERCENT_BASE * 2.25;
const RIGHT_SHIFT_WIDTH = KEY_WIDTH_PERCENT_BASE * 2.75;

const LEFT_CTRL_WIDTH = KEY_WIDTH_PERCENT_BASE * 1.5;
const LEFT_ALT_WIDTH = KEY_WIDTH_PERCENT_BASE * 1.5;
const SPACE_WIDTH = KEY_WIDTH_PERCENT_BASE * 9;
const RIGHT_ALT_WIDTH = KEY_WIDTH_PERCENT_BASE * 1.5;
const RIGHT_CTRL_WIDTH = KEY_WIDTH_PERCENT_BASE * 1.5;

export const KEYBOARD: Keyboard = {
  rows: [
    {
      keys: [
        { label: '`', code: 192 },
        { label: '1', code: 49 },
        { label: '2', code: 50 },
        { label: '3', code: 51 },
        { label: '4', code: 52 },
        { label: '5', code: 53 },
        { label: '6', code: 54 },
        { label: '7', code: 55 },
        { label: '8', code: 56 },
        { label: '9', code: 57 },
        { label: '0', code: 48 },
        { label: '-', code: 189 },
        { label: '=', code: 187 },
        { label: 'Backspace', code: 8, width: BACKSPACE_WIDTH, disabled: true },
      ],
    },
    {
      keys: [
        { label: 'Tab', code: 9, width: TAB_WIDTH, disabled: true },
        { label: 'Q', code: 81 },
        { label: 'W', code: 87 },
        { label: 'E', code: 69 },
        { label: 'R', code: 82 },
        { label: 'T', code: 84 },
        { label: 'Y', code: 89 },
        { label: 'U', code: 85 },
        { label: 'I', code: 73 },
        { label: 'O', code: 79 },
        { label: 'P', code: 80 },
        { label: '[', code: 219 },
        { label: ']', code: 221 },
        { label: '\\', code: 220, width: BACK_SLASH_WIDTH },
      ],
    },
    {
      keys: [
        { label: 'Caps Lock', code: 20, width: CAPS_LOCK_WIDTH, disabled: true },
        { label: 'A', code: 65 },
        { label: 'S', code: 83 },
        { label: 'D', code: 68 },
        { label: 'F', code: 70 },
        { label: 'G', code: 71 },
        { label: 'H', code: 72 },
        { label: 'J', code: 74 },
        { label: 'K', code: 75 },
        { label: 'L', code: 76 },
        { label: ';', code: 186 },
        { label: "'", code: 222 },
        { label: 'Enter', code: 13, width: ENTER_WIDTH, disabled: true },
      ],
    },
    {
      keys: [
        { label: 'Shift', code: 16, width: LEFT_SHIFT_WIDTH, disabled: true },
        { label: 'Z', code: 90 },
        { label: 'X', code: 88 },
        { label: 'C', code: 67 },
        { label: 'V', code: 86 },
        { label: 'B', code: 66 },
        { label: 'N', code: 78 },
        { label: 'M', code: 77 },
        { label: ',', code: 188 },
        { label: '.', code: 190 },
        { label: '/', code: 191 },
        { label: 'Shift', code: 16, width: RIGHT_SHIFT_WIDTH, disabled: true },
      ],
    },
    {
      keys: [
        { label: 'Ctrl', code: 17, width: LEFT_CTRL_WIDTH, disabled: true },
        { label: 'Alt', code: 18, width: LEFT_ALT_WIDTH, disabled: true },
        { label: ' ', code: 32, width: SPACE_WIDTH },
        { label: 'Alt', code: 18, width: RIGHT_ALT_WIDTH, disabled: true },
        { label: 'Ctrl', code: 17, width: RIGHT_CTRL_WIDTH, disabled: true },
      ],
    },
  ],
};
