import React from 'react';
import { Text, View } from 'react-native';
import * as Screens from './screens';

import {
    createAppContainer,
    createDrawerNavigator,
    createStackNavigator,
} from 'react-navigation';

import { DrawerItems, DrawerNavigation } from 'react-navigation'

import { Platform, StatusBar, StyleSheet } from 'react-native';

import Colors from './config/colors'

const DrawerContent = (props) => (
    <View>
        <View
        style={{
            backgroundColor: Colors.outerSpace,
            height: 140,
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
            <Text style={{ color: 'white', fontSize: 20 }}> MongoDB Companion </Text>
        </View>
        <DrawerItems {...props} />
    </View>
)

const MongoDBCompanionRoot = createStackNavigator({
        Connections: {
            screen: Screens.Connections,
        },
        AddConnection: {
            screen: Screens.AddConnection,
        },
        Collections: {
            screen: Screens.Collections,
        },
        AddCollection: {
            screen: Screens.AddCollection,
        },
        Documents: {
            screen: Screens.Documents,
        },
        AddDocument: {
            screen: Screens.AddDocument,
        },
        Document: {
            screen: Screens.Document,
        },
    }, {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: Colors.outerSpace,
            headerTitleStyle: {
                fontWeight: 'normal',
            },
        },
    });

const AppContainer = createAppContainer(MongoDBCompanionRoot);

export default class MongoDBCompanionApp extends React.Component {

    render = () => (
        <View style={styles.container}>
            <AppContainer/>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
            flex: 1,
        }
})