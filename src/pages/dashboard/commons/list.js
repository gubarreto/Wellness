import React from 'react';
import {View, Image, Dimensions, StyleSheet, Text} from 'react-native';

import {getColor} from '../../../services';

const {width, height} = Dimensions.get('window');

export const List = ({request, limit = 5, story}) => {

  const s = styles();

  const BACKGROUND = getColor("background");
  const BACKGROUND_LIGHT = getColor("box-background");

  return (
    <>
      {request.map(({
        id,
        text,
        press,
        photo
      }, index) => {
        return (
          <View key={id}>
            {(index < limit) && (
              <View
                style={[s.container, {
                  backgroundColor: "green",
                  marginRight: (index+1 == limit) ? 20 : 0,
                  marginLeft: (index == 0) ? 20 : 0,
                  width: story ? 100 : 100,
                  height: story ? 120 : 120,
                }]}>
                  <Text>{text}</Text>
                {/* <Image 
                  source={photo}
                  style={[s.image, {
                    backgroundColor: BACKGROUND,
                    width: story ? 80 : 140,
                    height: story ? 140 : 100,
                  }]}
                /> */}
              </View>
            )}
          </View>
        )
      })}
    </>
  )
};

const {blue} = "blue";

const styles = () => {
  return  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 15,
    },
    box: {
      borderRadius: 4,
      borderWidth: 1,
      width: width - 40,
      height: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 15,
      marginHorizontal: 20,
      elevation: 5,
    },
    touchableSearch: {
      width: 35,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'green'
    },
    viewTitle: {
      width: width,
      paddingHorizontal: 20,
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    textTitle: {
      fontSize: 15,
      paddingVertical: 2,
      paddingHorizontal: 5,
    },
    listHorizontal: {
      marginBottom: 10,
    },
    text: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    viewTouchableAdd: {
      alignSelf: 'flex-end',
      position: 'absolute',
    },
    touchableAdd: {
      backgroundColor: blue,
      width: 50,
      height: 50,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      top: height - 160,
      right: 20,
    },
  });
};
