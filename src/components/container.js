import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

export class Container extends React.Component {
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 10
            }}>
                {this.props.children}
            </View>
        );
    }
}

