
// import React, {useState, useRef, useEffect} from 'react';
// import {View, TouchableOpacity, Animated, Easing } from 'react-native';

// import {useGlobal} from '../../hooks/useGlobal';

// import styles from './styles';
// import PlusIcon from '../../assets/images/plus.svg';

// const quantityButtons = 4;
// const porcent = 100 / quantityButtons;

// export const AddButton = ({AddPress}) => {
//   const {globalProps} = useGlobal();
//   const s = styles();
//   const animate = useRef(new Animated.Value(0)).current;

//   const [pop, setPop] = useState(false);
//   const [showLabelButton1, setShowLabelButton1] = useState(false);

//   useEffect(() => {
//     Animated.timing(animate, {
//       toValue: pop ? 100 : 0,
//       duration: 450,
//       useNativeDriver: false,
//       // easing: Easing.out(Easing.exp)
//     }).start();
//   }, [pop]);

//   const Press = (func, setShowLabelButton) => {
//     func();
//     setShowLabelButton(false);
//     setPop(false);
//   };

//   const AnimatedPosition = index =>
//     animate.interpolate({
//       inputRange: [(index - 1) * porcent, index * porcent],
//       outputRange: [45, 20 + index * 65],
//       extrapolate: 'clamp',
//     });

//   const AnimatedScale = index =>
//     animate.interpolate({
//       inputRange: [index * porcent - 30, index * porcent],
//       outputRange: [0, 1],
//       extrapolate: 'clamp',
//     });

//   const ButtonCircle = (
//     background,
//     Icon,
//     colorIcon,
//     onClick,
//     index,
//     showLabelButton,
//     setShowLabelButton,
//     zIndex,
//   ) => {
//     return (
//       <Animated.View
//         style={[
//           s.circle,
//           pop && s.shadow,
//           {
//             transform: [{ scale: AnimatedScale(index) }],
//             bottom: AnimatedPosition(index),
//             opacity: AnimatedScale(index),
//             backgroundColor: background,
//           },
//         ]}>
//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={{ zIndex: 100, padding: 15, borderRadius: 22}}
//           onPress={() =>
//             Press(onClick, setShowLabelButton)
//           }
//         >
//           <Icon width={28} height={28} color={colorIcon} />
//         </TouchableOpacity >
//       </Animated.View>
//     );
//   };

//   return (
//     <View>
//       {ButtonCircle(
//         "green",
//         PlusIcon,
//         "white",
//         AddPress,
//         1,
//         showLabelButton1,
//         setShowLabelButton1,
//       )}

//       <TouchableOpacity
//         activeOpacity={1}
//         // disabled={disable}
//         onPress={setPop.bind(this, !pop)}
//         style={[
//           s.circle,
//           s.shadow,
//           { backgroundColor: getColor("box-background") },
//         ]}>
//         <PlusIcon
//           width={30}
//           height={30}
//           color={getColor("cont-color")}
//           style={pop && s.rotate}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// }