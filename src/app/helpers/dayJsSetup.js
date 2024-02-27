import customParseFormat from 'dayjs/plugin/customParseFormat';
import arraySupport from 'dayjs/plugin/arraySupport';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';
import badMutable from 'dayjs/plugin/badMutable';
import advancedFormat from 'dayjs/plugin/advancedFormat';

const parseZone = (option, dayjsClass, dayjsFactory) => {
  const matchOffset = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
  const chunkOffset = /([+-]|\d\d)/gi; // timezone chunker: '+10:00' > ['10',  '00'] ; '-1530'  > ['-15', '30']
  const absFloor = (number) => {
    if (number < 0) {
      // -0 -> 0
      return Math.ceil(number) || 0;
    } else {
      return Math.floor(number);
    }
  };
  const toInt = (argumentForCoercion) => {
    const coercedNumber = +argumentForCoercion;
    let value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
      value = absFloor(coercedNumber);
    }

    return value;
  };
  const offsetFromString = (matcher, string) => {
    const matches = (string || '').match(matcher);

    if (matches === null) {
      return null;
    }
    const chunk = matches[matches.length - 1] || [];
    const parts = `${chunk}`.match(chunkOffset) || ['-', 0, 0];
    const minutes = +(parts[1] * 60) + toInt(parts[2]);

    return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
  };

  dayjsFactory.parseZone = (str) => {
    const tZone = offsetFromString(matchOffset, str);

    return tZone ? dayjs(str).utcOffset(tZone) : dayjs(str).utcOffset(0, true);
  };
};

dayjs.extend(arraySupport);
dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(localizedFormat);
dayjs.extend(parseZone);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(weekday);
dayjs.extend(badMutable);
dayjs.extend(advancedFormat);
