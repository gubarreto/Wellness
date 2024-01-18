import {StyleSheet} from "react-native";
import {getColor} from "../../services";

const styles = () => {
  return (
    StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: getColor("background"),
      },
      text: {
        fontSize: 16,
        textAlign: 'center',
        color: getColor("font-color"),
      },
    })
  )
};

export default styles;