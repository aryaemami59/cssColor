/**
 * css-var.js
 */

import { TokenType, tokenize } from '@csstools/css-tokenizer';
import { LRUCache } from 'lru-cache';
import { isString } from './common';
import { cssCalc } from './css-calc';
import { isColor, valueToJsonString } from './util';

/* constants */
import { FN_VAR, SYN_FN_MATH_CALC, SYN_FN_VAR, VAL_SPEC } from './constant';

const {
  CloseParen: PAREN_CLOSE,
  Comment: COMMENT,
  EOF,
  Ident: IDENT,
  Whitespace: W_SPACE
} = TokenType;

/* regexp */
const REG_FN_MATH_CALC = new RegExp(SYN_FN_MATH_CALC);
const REG_FN_VAR = new RegExp(SYN_FN_VAR);

/* cached results */
export const cachedResults = new LRUCache({
  max: 4096
});

/**
 * resolve custom property
 * @param {Array.<Array>} tokens - tokens
 * @param {object} [opt] - options
 * @param {object} [opt.customProperty] - custom properties
 * @returns {Array.<string|Array|undefined>} - [tokens, resolvedValue]
 */
export function resolveCustomProperty(
  tokens: Array<any>,
  opt: {
    customProperty?: object;
  } = {}
): Array<string | Array<any> | undefined> {
  if (!Array.isArray(tokens)) {
    throw new TypeError(`${tokens} is not an array.`);
  }
  const { customProperty = {} } = opt;
  const items = [];
  while (tokens.length) {
    const token = tokens.shift();
    if (!Array.isArray(token)) {
      throw new TypeError(`${token} is not an array.`);
    }
    const [type, value] = token;
    // end of var()
    if (type === PAREN_CLOSE) {
      break;
    }
    // nested var()
    if (value === FN_VAR) {
      const [restTokens, item] = resolveCustomProperty(tokens, opt) as [
        Array<any>,
        string
      ];
      tokens = restTokens;
      if (item) {
        items.push(item);
      }
    } else if (type === IDENT) {
      if (value.startsWith('--')) {
        if (Object.hasOwnProperty.call(customProperty, value)) {
          items.push(customProperty[value as never]);
        } else if (
          typeof (customProperty as { callback: (value: any) => string })
            .callback === 'function'
        ) {
          const item = (
            customProperty as { callback: (value: any) => string }
          ).callback(value);
          if (item) {
            items.push(item);
          }
        }
      } else if (value) {
        items.push(value);
      }
    }
  }
  let resolveAsColor;
  if (items.length > 1) {
    const lastValue = items[items.length - 1];
    resolveAsColor = isColor(lastValue);
  }
  let resolvedValue;
  for (let item of items) {
    item = item.trim();
    if (REG_FN_VAR.test(item)) {
      // recurse cssVar()
      item = cssVar(item, opt);
      if (item) {
        if (resolveAsColor) {
          if (isColor(item)) {
            resolvedValue = item;
          }
        } else {
          resolvedValue = item;
        }
      }
    } else if (REG_FN_MATH_CALC.test(item)) {
      item = cssCalc(item, opt as never);
      if (resolveAsColor) {
        if (isColor(item)) {
          resolvedValue = item;
        }
      } else {
        resolvedValue = item;
      }
    } else if (
      item &&
      !/^(?:inherit|initial|revert(?:-layer)?|unset)$/.test(item)
    ) {
      if (resolveAsColor) {
        if (isColor(item)) {
          resolvedValue = item;
        }
      } else {
        resolvedValue = item;
      }
    }
    if (resolvedValue) {
      break;
    }
  }
  return [tokens, resolvedValue];
}

/**
 * parse tokens
 * @param {Array.<Array>} tokens - tokens
 * @param {object} [opt] - options
 * @returns {?Array.<Array>} - parsed tokens
 */
export function parseTokens(
  tokens: Array<Array<any>>,
  opt: object = {}
): Array<Array<any>> | null {
  const res = [] as Array<any>;
  while (tokens.length) {
    const token = tokens.shift();
    const [type, value] = token as [string, string];
    if (value === FN_VAR) {
      const [restTokens, resolvedValue] = resolveCustomProperty(tokens, opt);
      if (!resolvedValue) {
        return null;
      }
      tokens = restTokens as never;
      res.push(resolvedValue);
    } else {
      switch (type) {
        case PAREN_CLOSE: {
          if (res.length) {
            const lastValue = res[res.length - 1];
            if (lastValue === ' ') {
              res.splice(-1, 1, value);
            } else {
              res.push(value);
            }
          } else {
            res.push(value);
          }
          break;
        }
        case W_SPACE: {
          if (res.length) {
            const lastValue = res[res.length - 1];
            if (!lastValue.endsWith('(') && lastValue !== ' ') {
              res.push(value);
            }
          }
          break;
        }
        default: {
          if (type !== COMMENT && type !== EOF) {
            res.push(value);
          }
        }
      }
    }
  }
  return res;
}

/**
 * resolve CSS var()
 * @param {string} value - color value including var()
 * @param {object} [opt] - options
 * @param {object} [opt.customProperty] - custom properties
 * @returns {?string} - value
 */
export function cssVar(
  value: string,
  opt: {
    customProperty?: object;
  } = {}
): string | null {
  const { customProperty, format } = opt as Record<string, any>;
  if (isString(value)) {
    if (!REG_FN_VAR.test(value) || format === VAL_SPEC) {
      return value;
    }
    value = value.trim();
  } else {
    throw new TypeError(`${value} is not a string.`);
  }
  let cacheKey;
  if (typeof customProperty?.callback !== 'function') {
    cacheKey = `{cssVar:${value},opt:${valueToJsonString(opt)}}`;
    if (cachedResults.has(cacheKey)) {
      return cachedResults.get(cacheKey) as never;
    }
  }
  const tokens = tokenize({ css: value });
  const values = parseTokens(tokens, opt);
  if (Array.isArray(values)) {
    let color = values.join('');
    if (REG_FN_MATH_CALC.test(color)) {
      color = cssCalc(color, opt as never) as never;
    }
    if (cacheKey) {
      cachedResults.set(cacheKey, color);
    }
    return color;
  } else {
    if (cacheKey) {
      cachedResults.set(cacheKey, null!);
    }
    return null;
  }
}
