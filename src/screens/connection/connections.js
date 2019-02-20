import React from 'react';
import { View, Text, TouchableOpacity , FlatList, ToastAndroid } from 'react-native';
import { getConnectionsAsync, deleteConnectionAsync, getConnectionAsync, DeleteAllConnectionsAsync, addCurrentConnectionAsync } from '../../controllers';

import Colors from '../../config/colors';
import { Button } from "../../components";

export class Connections extends React.Component {

    static navigationOptions = {
        title: 'Connections',
    };

    state = {
        connections: []
    }

    componentDidMount = async () => {
        const connections = await getConnectionsAsync();
        this.setState({connections})
    }

    render() {
        return (
            <View>
                <Text>Connections</Text>
                <Button onPress={ async () => {
                    const deleteResponse = await DeleteAllConnectionsAsync();
                    ToastAndroid.show(deleteResponse || 'Error!', ToastAndroid.SHORT);
                }}>Clear Connections</Button>

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
                        onPress={async () => {
                            await deleteConnectionAsync(item.favouriteName);
                            let connections = this.state.connections;
                            connections = connections.filter((connection) => {
                                return connection.favouriteName != item.favouriteName;
                            });
                            this.setState({connections});
                            ToastAndroid.show('Deleted!', ToastAndroid.SHORT);
                        }}
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
