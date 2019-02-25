import React from 'react';
import { View, Text, TouchableOpacity , FlatList, ToastAndroid, Alert } from 'react-native';
import { getConnectionsAsync, deleteConnectionAsync, getConnectionAsync, DeleteAllConnectionsAsync, addCurrentConnectionAsync } from '../../controllers';
import { HeaderWithDrawer } from '../../components/header';
import Colors from '../../config/colors';
import { Button } from "../../components";

export class Connections extends React.Component {

    static navigationOptions = ({ navigation }) => HeaderWithDrawer(navigation, 'Connections');

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
        this.setState({connections})
    }

    render() {
        return (
            <View>
                <Button onPress={ () => this.clearAllConnections()}>Clear Connections</Button>

                <FlatList
                data={this.state.connections}
                keyExtractor={(item) => item.favouriteName}
                renderItem={({item}) => (
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                        style={{
                            flex: 1,
                            paddingHorizontal: 15,
                            paddingVertical: 20,
                            backgroundColor: Colors.cararra,
                            borderBottomColor: '#fff',
                            borderBottomWidth: 0.2
                        }}
                        onPress={async () => {
                            await addCurrentConnectionAsync(item.favouriteName);
                            this.props.navigation.navigate('Collections')
                        }}
                        >
                            <Text>{item.favouriteName}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={{
                            backgroundColor: Colors.pomegranate,
                            paddingHorizontal: 15,
                            paddingVertical: 20,
                        }}
                        onPress={ () => this.deleteConnection(item.favouriteName)}
                        >
                            <Text>X</Text>
                        </TouchableOpacity>
                    </View>
                    )}
                />
            </View>
        );
    }
}
