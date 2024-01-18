import {Dimensions, StyleSheet} from "react-native";

import {getColor} from "../../../../services";

const {width, height} = Dimensions.get('window');

export const styles = () => {
  return (
    StyleSheet.create({
      container: {
        justifyContent: 'center',
        backgroundColor: "transparent",
      },
      title: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
        color: getColor("font-color"),
      },
      textInput: {
        fontSize: 14,
        color: getColor("font-color"),
        flex: 1,
      },
      box: {
        borderRadius: 10,
        flexDirection: 'row',
        borderColor: getColor("box-border-color"),
        borderWidth: 1,
        minHeight: 40,
        alignItems: 'center',
        paddingHorizontal: 10,
        width: width - 40,
        backgroundColor: getColor("box-background"),
        marginBottom: 10,
      },
    })
  )
};