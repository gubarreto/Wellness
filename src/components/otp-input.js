import React, { useEffect, useRef, useState } from 'react'
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputKeyPressEventData, View } from 'react-native'

export const OTPInput = ({
    length,
    disabled,
    value,
    onChange
}) => {
    const [localState, setLocalState] = useState([...new Array(length)].map((item, index) => ({ index, value: '' })))
    const inputRefs = useRef([])

    const onChangeValue = (text, index) => {
        setLocalState(prevState => prevState.map(item => {
            if (item.index === index) {
                return {
                    index,
                    value: `${item.value}${text}`
                }
            }

            return {
                index: item.index,
                value: item.value
            }
        }))
        const newValue = value.map((item, valueIndex) => {
            if (valueIndex === index) {
                return text
            }

            return item
        })

        onChange(newValue)
    }

    const clearLocalState = () => {
        setLocalState([...new Array(length)].map((item, index) => ({ index, value: '' })))
    }

    const handleChange = (text, index) => {

        onChangeValue(text, index)

        if (text.length !== 0) {
            return inputRefs?.current[index + 1]?.focus()
        } else {
          return inputRefs?.current[index - 1]?.focus()
        }
    }

    const handleKeyPress = (event, index) => {
        const { nativeEvent } = event

        if (nativeEvent.key === 'Backspace') {
            return handleChange('', index)
        }
        const currentValue = Array.isArray(value) ? value[index] : '';

        if (currentValue?.length === 1) {
          return handleChange(nativeEvent.key, index);
        }
    }

    useEffect(() => {
        const longValue = localState.find(item => item.value.length === length)

        if (longValue) {
            onChange(longValue.value.split(''))
        }
    }, [localState])

    return (
        <View style={styles.container}>
            {[...new Array(length)].map((item, index) => (
                <TextInput
                    ref={ref => {
                        if (ref && !inputRefs.current.includes(ref)) {
                            inputRefs.current = [...inputRefs.current, ref]
                        }
                    }}
                    key={index}
                    maxLength={1}
                    value={value[index]}
                    contextMenuHidden
                    testID="OTPInput"
                    editable={!disabled}
                    style={styles.input}
                    onBlur={clearLocalState}
                    keyboardType="decimal-pad"
                    onChangeText={text => handleChange(text, index)}
                    onKeyPress={event => handleKeyPress(event, index)}
                    caretHidden
                    secureTextEntry
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        width: 45,
        height: 55,
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        color: "black",
        backgroundColor: "#efefef",
        borderRadius: 10,
    }
});