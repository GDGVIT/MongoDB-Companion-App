import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import Colors from '../config/colors'

export class Button extends React.Component {
    render() {
        return (
            <View>
                <TouchableOpacity
                style={{
                        backgroundColor: this.props.color || Colors.outerSpace,
                        paddingVertical: 15,
                        marginHorizontal: 10,
                        marginVertical: 5,
                        borderRadius: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}
                onPress={this.props.onPress}
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

