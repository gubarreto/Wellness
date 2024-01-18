import {Dimensions, StyleSheet} from "react-native";
import {useGlobal} from "../../../../hooks/useGlobal";
import {getColor} from "../../../../services";

const {width, height} = Dimensions.get('window');

export const styles = () => {
  const {globalProps} = useGlobal();
  return (
    StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "transparent",
      },
      title: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
        color: getColor('font-color'),
      },
      textInput: {
        flex: 1,
        fontSize: 14,
        color: getColor('font-color')
      },
      box: {
        borderRadius: 10,
        flexDirection: 'row',
        borderColor: getColor('box-border-color'),
        borderWidth: 1,
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 10,
        flex: 1,
        backgroundColor: getColor('box-background'),
        marginBottom: 10,
      },
    })
  )
};