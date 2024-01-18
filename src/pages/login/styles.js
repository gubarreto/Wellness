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
      backgroundColor: getColor("primary-light"),
    },
    logo: {
      width: 180,
      height: 170,
      marginVertical: 30,
      alignSelf: 'center',
    },
    buttonSignIn: {
      width: 140,
      height: 40,
      marginTop: 30,
      borderRadius: 20,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: getColor("primary-dark"),
    },
    textButtonSignIn: {
      fontSize: 18,
      fontWeight: "bold",
      color: getColor("white"),
      textTransform: "uppercase",
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