import React, {memo, useEffect, useState} from 'react';
import {Modal, View, TouchableOpacity, Text, StyleSheet} from 'react-native';

import moment from 'moment';
import {useGlobal} from '../../../../../hooks/useGlobal';
import {Calendar, LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['sp-sp'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul.',
    'Ago',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dic.',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'],
};
LocaleConfig.locales['en-us'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'Dezember',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July.',
    'Aug',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dez.',
  ],
  dayNames: [
    'Sunday',
    'Munday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun', 'Mun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar',
    'Abr',
    'Maio',
    'Jun',
    'Jul.',
    'Ago',
    'Set.',
    'Out.',
    'Nov.',
    'Dez.',
  ],
  dayNames: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
};

export const ModalCalendar = memo(({
  modalVisible, closeDate, saveDate, dateTemp, setDateTemp, minDate, maxDate, markedDateProps, singleMarkedDateProps, hasSelectHour, typeCalendar
}) => {
  const {globalProps} = useGlobal();
  const [markedDates, setMarkedDates] = useState(markedDateProps ? markedDateProps : singleMarkedDateProps ? singleMarkedDateProps : {});

  const todayDate = JSON.stringify(moment());
  const minDateFormat = moment(minDate).format('YYYY-MM-DD');
  const maxDateFormat = moment(maxDate).format('YYYY-MM-DD');

  const themeCalendar = {
    backgroundColor: "white",
    calendarBackground: "black",
    todayTextColor: globalProps.companyColor,
    dayTextColor: "white",
    textDisabledColor: '#A9A9A9',
    monthTextColor: "white",
    arrowColor: globalProps.companyColor,
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '500',
    textDayFontSize: 16,
    textMonthFontSize: 18,
    selectedDayBackgroundColor: globalProps.companyColor,
    selectedDayTextColor: "white",
    textDayHeaderFontSize: 13,
    textSectionTitleColor: '#696969'
  };

  const selectDate = day => {
    const date = moment(day.dateString);
    // if (typeCalendar == 'end') {
    //   date.set({hour: 23, minute: 59, second:59, millisecond:999});
    //   getSelectedDayEvents(day.dateString);
    //   setDateTemp(date);
    // } else {
      getSelectedDayEvents(day.dateString);
      setDateTemp(date);
    // };
  };

  const getSelectedDayEvents = date => {
    let markedDates = markedDateProps ? {...markedDateProps} : {};
    markedDates[date] = { selected: true, color: "black", textColor: "white" };
    setMarkedDates(markedDates);
  };

  return (
    <Modal
      style={s.modal}
      animationType="fade"
      transparent={true}
      visible={modalVisible}>
      <View style={s.modalContainer}>
        <View style={s.content}>

          <Calendar
            style={s.calendarModal}
            minDate={minDate ? minDateFormat : JSON.parse(todayDate)}
            maxDate={maxDate ? maxDateFormat : null}
            onDayPress={day => {
              selectDate(day);
            }}
            markedDates={markedDates}
            theme={themeCalendar}
            disableAllTouchEventsForDisabledDays

          />
          <View style={s.viewModalButton}>
            <TouchableOpacity
              style={s.modalButton}
              onPress={closeDate}
            >
              <Text style={s.textModalButton}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={s.modalButton}
              onPress={saveDate}
            >
              <Text style={s.textModalButton}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});

const s = StyleSheet.create({
  modal: {},

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
    justifyContent: 'flex-end',
  },

  content: {
    width: '100%',
    backgroundColor: "black",
    paddingTop: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  viewTime: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  areaTime: {
    height: 80,
    width: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  calendarModal: {
    width: '100%',
  },

  viewModalButton: {
    backgroundColor: "black",
    height: 58,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  modalButton: {
    width: 80,
    marginRight: 25,
  },

  textModalButton: {
    marginTop: 2,
    width: 80,
    fontSize: 15,
    color: "white",
  },
});
