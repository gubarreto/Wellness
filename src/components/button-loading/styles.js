import {StyleSheet, Dimensions} from 'react-native';
import {getColor} from '../../services';

const {width, height} = Dimensions.get('window');

const styles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: getColor('primary-light'),
    },
    content: {
    },
    button: {
    },
    text: {
      flex: 1,
      fontSize: 24,
      color: getColor('primary'),
    },

   });
};
export default styles;