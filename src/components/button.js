import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import Colors from '../config/colors'

export default class Button extends React.Component {
    render() {
        return (
            <View>
                <TouchableOpacity
                style={{
                        backgroundColor: this.props.color || Colors.outerSpace,
                        paddingVertical: 15,
                        marginHorizontal: 25,
                        marginVertical: 5,
                        borderRadius: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}
                >
                    <Text
                    style={{
                        color: this.props.textColor || "#ffffff",
                    }}
                    >{this.props.children}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

