import React from 'react';
import {
    View,
    TouchableOpacity,
} from 'react-native';
import Colors from '../../config/colors'
import Icon from 'react-native-vector-icons/FontAwesome';

export const HeaderWithBack = (navigation, title) => ({
    title: title.toUpperCase(),
    headerStyle: {
        backgroundColor: 'transparent',
    },
    headerTitleStyle: {
        fontWeight: 'normal',
        color: Colors.outerSpace,
    },
    headerLeft: (
        <View style={{marginHorizontal: 20}}>
            <TouchableOpacity onPress={() => navigation.goBack() }>
                <Icon name="arrow-left" size={25} color={Colors.outerSpace}/>
            </TouchableOpacity>
        </View>
    ),
    headerTintColor: '#fff',
});

export const HeaderWithDrawer = (navigation, title) => ({
    title: title.toUpperCase(),
    headerStyle: {
        backgroundColor: 'transparent'
    },
    headerTitleStyle: {
        fontWeight: 'normal',
        color: Colors.outerSpace,
    },
    headerLeft: (
        <View style={{marginHorizontal: 20}}>
            <TouchableOpacity onPress={() => navigation.openDrawer() }>
                <Icon name="bars" size={25} color={Colors.outerSpace}/>
            </TouchableOpacity>
        </View>
    ),
    headerTintColor: '#fff',
});

