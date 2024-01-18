import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');
import {getColor} from "../../services/getColor";

const styles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      // paddingHorizontal: 20,
      backgroundColor: getColor('background'),
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    view: {},
    touchable: {},
    text: {
      color: getColor('font-color'),
    },

   });
};
export default styles;