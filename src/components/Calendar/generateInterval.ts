import { eachDayOfInterval, format } from 'date-fns';

import { MarkedDatesProps, DayProps } from '.';
import theme from '../../styles/theme';
import { getPlatformDate } from '../../utils/getPlatformDate';

export function generateInterval(start: DayProps, end: DayProps) {
  let interval: MarkedDatesProps = {};

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp)
  }).forEach(item => {
    const date = format(getPlatformDate(item), 'yyyy-MM-dd');

    const isInitialOrFinalDate =
      start.dateString === date || end.dateString === date;

    interval = {
      ...interval,
      [date]: {
        color: isInitialOrFinalDate
          ? theme.colors.main
          : theme.colors.main_light,
        textColor: isInitialOrFinalDate
          ? theme.colors.main_light
          : theme.colors.main
      }
    };
  });

  return interval;
}
