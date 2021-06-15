import React from 'react';

import {
  Calendar as CustomCalendar,
  DateCallbackHandler,
  LocaleConfig
} from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { ptBR } from './localeConfig';

LocaleConfig.defaultLocale = 'pt-br';
LocaleConfig.locales['pt-br'] = ptBR;

export type MarkedDatesProps = {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
};

export type DayProps = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

export type CalendarProps = {
  markedDates: MarkedDatesProps;
  onDayPress: DateCallbackHandler;
};

function Calendar({ markedDates, onDayPress }: CalendarProps) {
  const theme = useTheme();

  return (
    <CustomCalendar
      renderArrow={direction => (
        <Feather
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
          color={theme.colors.text}
          size={24}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secundary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10
      }}
      theme={{
        textDayFontFamily: theme.fonts.family.inter.regular,
        textDayHeaderFontFamily: theme.fonts.family.archivo.semibold,
        textDayHeaderFontSize: 10,
        textMonthFontSize: 20,
        textMonthFontWeight: 'bold',
        arrowStyle: {
          marginHorizontal: -15
        }
      }}
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}

export default Calendar;
