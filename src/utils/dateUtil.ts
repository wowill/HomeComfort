/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';

export function formatToDateTime(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_TIME_FORMAT,
): string {
  return dayjs(date).format(format);
}

export function formatToDate(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_FORMAT,
): string {
  return dayjs(date).format(format);
}

export const DateFormatsMap = {
  Y2s: DATE_TIME_FORMAT,
  Y2D: DATE_FORMAT,
};
export function formatDate(
  date: dayjs.Dayjs | undefined,
  format: string = DateFormatsMap.Y2D,
): string {
  if (!date) {
    return '';
  }
  return dayjs(date).format(format);
}

export const dateUtil = dayjs;
