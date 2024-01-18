import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');
import {getColor} from "../../services/getColor";

const styles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getColor('primary-light'),
      alignItems: 'center',
      justifyContent: 'center',
    },
   });
};
export default styles;