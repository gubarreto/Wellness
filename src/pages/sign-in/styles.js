import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get("window");
import {getColor} from "../../services/getColor";

const styles = () => {
  return StyleSheet.create({
    safeareaview: {
      flex: 1,
      backgroundColor: getColor("primary-light"),
    },
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 40,
      justifyContent: "space-between",
      backgroundColor: getColor("primary-light"),
    },
    logo: {
      width: 180,
      height: 170,
      marginVertical: 30,
      alignSelf: 'center',
    },
    button: {
      width: width - 40,
      height: 50,
      marginTop: 10,
      borderRadius: 25,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: getColor("white"),
    },
    textButton: {
      fontSize: 18,
      fontWeight: "500",
      color: getColor("font-color"),
      // textTransform: "uppercase",
    },
    text: {
      color: getColor("font-color"),
    },
    title : {
      fontSize: 14,
      marginTop: 15,
      fontWeight: "bold",
      textAlign: "center",
      color: getColor("primary-dark"),
    },
   });
};
export default styles;