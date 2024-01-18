import {Dimensions, StyleSheet} from "react-native";
import {getColor} from "../../../../services";
import {useGlobal} from "../../../../hooks/useGlobal";

const {width, height} = Dimensions.get('window');

export const styles = () => {
  const {globalProps} = useGlobal();
  const {theme} = globalProps;
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
      box: {
        minHeight: 40,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: getColor('box-border-color'),
        backgroundColor: getColor('box-background'),
      },
      text: {
        flex: 1,
        fontSize: 14,
        marginLeft: 10,
        color: getColor('font-color')
      },
    })
  )
};