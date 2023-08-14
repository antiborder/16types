import { cognitiveFunctionLabels } from "./constants/cognitiveFunctionLabels";
import { typeLabels } from "./constants/typeLabels";

export function hslToRgb(h, s, v) {
  let f = (n, k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);     
  let rgb = [f(5), f(3), f(1)];
  return '#' + rgb.map(x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

export function getTextColor(type){
  return hslToRgb(typeLabels[type]['hue'], 1, 0.6)
}

export function getBackgroundColor(type){
  return hslToRgb(typeLabels[type]['hue'], 0.1, 1)
}

export function getSurfaceColor(type){
  return hslToRgb(typeLabels[type]['hue'], 0.5, 0.9)
}

export function getFuncTextColor(symbol){
  return hslToRgb(cognitiveFunctionLabels[symbol]['hue'], 1, 0.8)
}

export function getFuncBackgroundColor(symbol){
  return hslToRgb(cognitiveFunctionLabels[symbol]['hue'], 0.15, 1)
}

export function getFuncPlaneColor(symbol){
  return hslToRgb(cognitiveFunctionLabels[symbol]['hue'], 1, 1)
}

