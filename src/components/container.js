import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

export default class Container extends React.Component {
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center'
            }}>
                {this.props.children}
            </View>
        );
    }
}

