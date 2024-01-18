import React from 'react';
import {View, Modal, TouchableOpacity, Text, StyleSheet, FlatList} from 'react-native';
import {getColor} from '../../../../../services';
import {useGlobal} from '../../../../../hooks/useGlobal';

export const ModalItem = ({
  modalVisible,
  setModalVisible,
  prop
}) => {

  const {globalProps} = useGlobal();
  const s = styles();

  const ListItem = ({
    id,
    name,
    name2,
    prop
  }) => {

    const onClick = () => {
      prop.setValue(name2 ? `${name} - ${name2}` : name);
      prop.setValueId(id);
      setModalVisible(false);
    };
    return (
      <View style={s.containerList}>
        <TouchableOpacity
          style={s.touchableList}
          onPress={onClick}
        >
          <Text style={[s.textList, {color: getColor('font-color')}]}>{name2 ? `${name} - ${name2}` : name}</Text>
        </TouchableOpacity>
      </View>
    )
  };

  const renderSeparator = () => (<View style={s.separator} />);

  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <TouchableOpacity style={s.touchableClose} onPress={setModalVisible.bind(this, false)}>
        <View style={s.container}>
          <FlatList
            ItemSeparatorComponent={renderSeparator}
            data={prop.request}
            keyExtractor={(_item, index) => index}
            renderItem={({item}) => (
              <ListItem
                prop={prop}
                id={item[prop.itemIdHash]}
                name={item[prop.itemNameHash]}
                name2={item[prop.itemNameHash2] || null}
              />
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  )
};

const styles = () => {
  const {globalProps} = useGlobal();
  const {theme} = globalProps;
  return (
    StyleSheet.create({
      touchableClose: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.60)',
      },
      container: {
        width: 320,
        maxHeight: 400,
        borderRadius: 10,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: getColor('box-background')
      },

      containerList: {
        width: 320,
        marginTop: 5,
        justifyContent: 'center',
      },
      touchableList: {
        height: 40,
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
      },
      textList: {
        left: 15,
        fontSize: 16,
      },
      separator: {
        height: 1,
        width: '92%',
        alignSelf: 'center',
        backgroundColor: "#585858",
      }
    })
  );
};