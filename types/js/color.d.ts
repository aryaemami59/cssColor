export function validateColorComponents(arr: any[], opt?: {
    alpha?: boolean;
    minLength?: number;
    maxLength?: number;
    minRange?: number;
    maxRange?: number;
    validateRange?: boolean;
}): any[];
export function transformMatrix(mtx: Array<Array<number>>, vct: Array<number>): Array<number>;
export function reInsertMissingColorComponents(value: string, color?: any[]): Array<number | string>;
export function normalizeColorComponents(colorA: any[], colorB: any[]): Array<Array<number>>;
export function numberToHexString(value: number): string;
export function angleToDeg(angle: string): number;
export function convertRgbToLinearRgb(rgb: Array<number>): Array<number>;
export function convertRgbToXyz(rgb: Array<number>): Array<number>;
export function convertRgbToXyzD50(rgb: Array<number>): Array<number>;
export function convertRgbToHex(rgb: Array<number>): string;
export function convertLinearRgbToRgb(rgb: Array<number>): Array<number>;
export function convertLinearRgbToHex(rgb: Array<number>): string;
export function convertXyzToHex(xyz: Array<number>): string;
export function convertXyzD50ToHex(xyz: Array<number>): string;
export function convertXyzToRgb(xyz: Array<number>): Array<number>;
export function convertXyzToXyzD50(xyz: Array<number>): Array<number>;
export function convertXyzToHsl(xyz: Array<number>): Array<number>;
export function convertXyzToHwb(xyz: Array<number>): Array<number>;
export function convertXyzToOklab(xyz: Array<number>): Array<number>;
export function convertXyzToOklch(xyz: Array<number>): Array<number>;
export function convertXyzD50ToRgb(xyz: Array<number>): Array<number>;
export function convertXyzD50ToLab(xyz: Array<number>): Array<number>;
export function convertXyzD50ToLch(xyz: Array<number>): Array<number>;
export function convertHexToRgb(value: string): Array<number>;
export function convertHexToLinearRgb(value: string): Array<number>;
export function convertHexToXyz(value: string): Array<number>;
export function parseAlpha(a?: string | null): number;
export function parseRgb(value: string): Array<number>;
export function parseHsl(value: string): Array<number>;
export function parseHwb(value: string): Array<number>;
export function parseLab(value: string): Array<number>;
export function parseLch(value: string): Array<number>;
export function parseOklab(value: string): Array<number>;
export function parseOklch(value: string): Array<number>;
export function parseColorFunc(value: string, d50?: boolean): Array<number>;
export function parseColorValue(value: string, d50?: boolean): Array<number>;
export function convertColorValueToLinearRgb(value: string, opt?: object): Array<number>;
export function convertColorValueToRgb(value: string): Array<number>;
export function resolveColorValue(value: string): Array<number>;
export function resolveColorFunc(value: string): Array<number>;
export function resolveColorMix(value: string, opt?: object): Array<number>;
