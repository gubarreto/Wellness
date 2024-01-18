// Este componente recebe um value (prop.value) sendo uma data do tipo new Date do Javascript,
// onde converto ela com a lib moment, faço as tratativas e converto de volta para new Date.

import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import MaskInput from 'react-native-mask-input';
import {getTranslation} from '../../../../services';

import {styles} from './styles';
import {ModalCalendar} from './commons';
import {getColor} from '../../../../services';
import {useGlobal} from '../../../../hooks/useGlobal';

import CalendarIcon from '../../../../assets/images/arrow.svg';

export const InputDate = ({prop}) => {
  const {globalProps} = useGlobal();
  const [dateTemp, setDateTemp] = useState(prop.minDate ? prop.minDate : prop.value);
  const [calendarDisplay, setCalendarDisplay] = useState(false);
  const s = styles();

  const saveDate = async() => {
    // caso queira fazer uma tratativa diferente para saveDate, porém, lembre-se que dateTemp é uma data da lib moment
    if (prop.saveDate) {
      prop.saveDate(dateTemp, setDateTemp);
    } else {
      if (prop.typeCalendar == 'end'){
        let date = moment(dateTemp).utc();
        Promise.all(date.set({hour: 23, minute: 59, second:59})).then(() => {
          prop.setValue(date);
        });
      } else {
        let dateUtc = moment(dateTemp).utc();
        let date = new Date(dateUtc);
        prop.setValue(date);
      };
    };
    setCalendarDisplay(false);
  };

  const closeDate = () => {
    if (prop.closeDate) {
      prop.closeDate(dateTemp, setDateTemp);
    } else {
      let date = moment(prop.value);
      setDateTemp(date);
    };
    setCalendarDisplay(false);
  };

  let marketDates = {};
  let dateTempMarkedDate = moment(prop.value).format('YYYY-MM-DD');
  marketDates[dateTempMarkedDate] = {selected: true, color: 'black', textColor: 'white'};

  return (
    <View style={s.container}>
      {prop.title &&
        <Text style={s.title}>{prop.title} {prop.required && '*'}</Text>
      }
      <TouchableOpacity
        onPress={setCalendarDisplay.bind(this, true)}
        style={s.content}
      >
        <View style={s.box}>
          <MaskInput
            style={s.textInput}
            value={
              prop.value ?
                `${moment(prop.value).format(globalProps.company.dateFormat.toUpperCase())} ${prop.hasSelectHour ?
                  moment(prop.value).format(globalProps.company.hourFormat) : ''}`
              : "Selecione a data"
            }
            placeholderTextColor={getColor("font-color")}
            editable={false}
          />
        </View>
        <TouchableOpacity
          style={{marginLeft: 5}}
          onPress={setCalendarDisplay.bind(this, true)}
        >
          <CalendarIcon
            color={getColor("font-color")}
            width={36}
            height={36}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      {calendarDisplay &&
        <ModalCalendar
          modalVisible={calendarDisplay}
          closeDate={closeDate}
          saveDate={saveDate}
          dateTemp={dateTemp}
          setDateTemp={setDateTemp}
          // hasSelectHour={prop.hasSelectHour}
          // singleMarkedDateProps={marketDates}
          minDate={prop.minDate}
          typeCalendar={prop.typeCalendar}
        />
      }
    </View>
  );
};