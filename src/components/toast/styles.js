import {StyleSheet, Dimensions} from 'react-native';

import {getColor} from "../../services";

const {width, height} = Dimensions.get('window');

const styles = () => {
  return StyleSheet.create({
    container: {
      top: 10,
      flex: 1,
      left: 10,
      // height: 60,
      paddingVertical: 10,
      paddingHorizontal: 15,
      width: width - 20,
      position: "absolute",
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 15,
      justifyContent: "space-between",
      backgroundColor: getColor("background"),
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    title: {
      flex: 1,
      fontSize: 16,
      fontWeight: "700",
      color: getColor("font-color"),
    },
    description: {
      flex: 1,
      fontSize: 14,
      color: getColor("font-color"),
    },

   });
};
export default styles;