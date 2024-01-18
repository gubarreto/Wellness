import {Dimensions, StyleSheet} from "react-native";
import {getColor} from "../../../../services";
import {useGlobal} from "../../../../hooks/useGlobal";

const {width, height} = Dimensions.get('window');

export const styles = () => {
  const {globalProps} = useGlobal();
  return (
    StyleSheet.create({
      container: {
        flex: 1,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "transparent",
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        color: getColor('font-color'),
      },
    })
  )
};