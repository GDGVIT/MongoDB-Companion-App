import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../config/colors';

export class ListItem extends React.Component {
    render() {
        return (
            <View style={{flexDirection: 'row', marginVertical: 3}}>
                <TouchableOpacity
                style={{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: this.props.backgroundColor || Colors.cararra,
                        paddingVertical: 20,
                        marginHorizontal: 5,
                        borderRadius: 5,
                        paddingHorizontal: 15,
                    }}
                onPress={this.props.onPress}
                >
                    <Icon name={this.props.icon} size={15} style={{marginHorizontal: 5}}/>
                    <Text>{this.props.children}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={{
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                }}
                onPress={this.props.onDeletePress}
                >
                    <Icon name={this.props.rightIcon || 'trash'} size={15} color={Colors.pomegranate}/>
                </TouchableOpacity>
            </View>
        );
    }
}

