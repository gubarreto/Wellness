import {StyleSheet, Dimensions} from 'react-native';
import {getColor} from '../../services';

const {width, height} = Dimensions.get('window');

const styles = () => {
  return StyleSheet.create({
    container: {
      height: 90,
      width: width,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: getColor('primary-light'),
    },
    content: {
      flexDirection: "row",
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    buttonNotif: {
      width: 40,
      height: 40,
      marginLeft: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      flex: 1,
      fontSize: 24,
      fontWeight: "700",
      color: getColor('primary'),
    },

   });
};
export default styles;