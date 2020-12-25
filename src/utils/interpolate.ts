export enum Extrapolate {
  EXTEND = 'extend',
  CLAMP = 'clamp',
  IDENTITY = 'identity',
}

function internalInterpolate(values: number[], type?: Extrapolate) {
  const [x, l, r, ll, rr] = values;

  if (r - l === 0) return ll;

  const progress = (x - l) / (r - l);
  const val = ll + progress * (rr - ll);
  const coef = rr >= ll ? 1 : -1;

  type = type || Extrapolate.EXTEND;

  if (coef * val < coef * ll || coef * val > coef * rr) {
    switch (type) {
      case Extrapolate.IDENTITY:
        return x;
      case Extrapolate.CLAMP:
        if (coef * val < coef * ll) {
          return ll;
        }
        return rr;
      case Extrapolate.EXTEND:
      default:
        return val;
    }
  }

  return val;
}

export function interpolate(
  x: number,
  input: number[],
  output: number[],
  type?: Extrapolate,
) {
  const length = input.length;
  let narrowedInput: number[] = [];

  if (x < input[0]) {
    narrowedInput = [input[0], input[1], output[0], output[1]];
  } else if (x > input[length - 1]) {
    narrowedInput = [
      input[length - 2],
      input[length - 1],
      output[length - 2],
      output[length - 1],
    ];
  } else {
    for (let i = 1; i < length; ++i) {
      if (x <= input[i]) {
        narrowedInput = [input[i - 1], input[i], output[i - 1], output[i]];
        break;
      }
    }
  }
  return internalInterpolate([x, ...narrowedInput], type);
}
