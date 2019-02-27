import React from 'react';
import { View, Text, TouchableOpacity , FlatList, ToastAndroid, Alert } from 'react-native';
import { getConnectionsAsync, deleteConnectionAsync, getConnectionAsync, DeleteAllConnectionsAsync, addCurrentConnectionAsync } from '../../controllers';
import { HeaderWithDrawer } from '../../components/header';
import Colors from '../../config/colors';
import { Button, ListItem } from "../../components";

export class Connections extends React.Component {

    static navigationOptions = {
        title: 'Connections'
    };

    state = {
        connections: []
    }

    clearAllConnections = () => {
        Alert.alert(
            'Are you sure?',
            'Clear All Colllections',
            [
                {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
                },
                {text: 'OK', onPress: async () => {
                    const deleteResponse = await DeleteAllConnectionsAsync();
                    ToastAndroid.show(deleteResponse || 'Error!', ToastAndroid.SHORT);
                }},
            ],
        );
    }

    deleteConnection = (favouriteName) => {
        Alert.alert(
            'Are you sure?',
            `Delete ${favouriteName} connection`,
            [
                {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
                },
                {text: 'OK', onPress: async () => {
                    await deleteConnectionAsync(favouriteName);
                    let connections = this.state.connections;
                    connections = connections.filter((connection) => {
                        return connection.favouriteName != favouriteName;
                    });
                    this.setState({connections});
                    ToastAndroid.show('Deleted!', ToastAndroid.SHORT);
                }},
            ],
        );
    }

    componentDidMount = async () => {
        const connections = await getConnectionsAsync();
        this.setState({connections});
    }

    render() {
        return (
            <View>
                <Button onPress={ () => this.props.navigation.navigate("AddConnection")}>Add Connection</Button>
                <Button onPress={ async () => {
                    const connections = await getConnectionsAsync();
                    this.setState({connections});
                }}>Refresh Connections</Button>
                <Button color={Colors.pomegranate} onPress={ () => this.clearAllConnections()}>Clear Connections</Button>
                <FlatList
                data={this.state.connections}
                keyExtractor={(item) => item.favouriteName}
                renderItem={({item}) => (
                    <ListItem
                    icon="plug"
                    onPress={async () => {
                        await addCurrentConnectionAsync(item.favouriteName);
                        this.props.navigation.navigate('Collections')
                    }}
                    onDeletePress={
                        () => this.deleteConnection(item.favouriteName)
                    }
                    >
                        {item.favouriteName}
                    </ListItem>
                    )}
                />
            </View>
        );
    }
}