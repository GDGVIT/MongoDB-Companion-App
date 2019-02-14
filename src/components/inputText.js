import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

import Colors from '../config/colors'

export default class InputText extends React.Component {
    render() {
        return (
            <View>
                <TextInput
                style={{
                        borderColor: this.props.color || Colors.outerSpace,
                        borderWidth: 1,
                        padding: 5,
                        marginHorizontal: 25,
                        marginVertical: 5,
                        borderRadius: 5,
                    }}
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                />
            </View>
        );
    }
}

