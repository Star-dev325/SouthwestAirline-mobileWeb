// @flow
const repeatStr = (str, times = 1) => {
  let result = str;

  while (times > 1) {
    result += str;
    times--;
  }

  return result;
};

export const getMaskProps = function (mask: string | { rule: string, repeat?: number, maskChar?: string }) {
  const defaultMask = {
    repeat: 1,
    maskChar: null
  };

  const maskConfigs = Object.assign({}, defaultMask, typeof mask === 'string' ? { rule: mask } : mask);

  const finalMaskStr = repeatStr(maskConfigs.rule, maskConfigs.repeat);

  return {
    mask: finalMaskStr,
    maskChar: maskConfigs.maskChar,
    maxLength: finalMaskStr.length // mask can't work properly in some android device so use maxLength to limit the user input, see bug#2026
  };
};
