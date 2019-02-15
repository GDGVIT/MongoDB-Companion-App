import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ToastAndroid } from 'react-native';

import Colors from '../../config/colors'

export class Collections extends React.Component {

    state = {
        connections: [ {name: 'collection1'},  {name: 'collection2'}]
    }

    render() {
        return (
            <View>
                <Text>Collections</Text>
                <FlatList
                data={this.state.connections}
                keyExtractor={(item) => item.name}
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
                        onPress={() => this.props.navigation.navigate("Documents")}
                        >
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={{
                            backgroundColor: Colors.pomegranate,
                            paddingHorizontal: 15,
                            paddingVertical: 20,
                        }}
                        onPress={async () => {
                            // await deleteConnectionAsync(item.favouriteName);
                            // let connections = this.state.connections;
                            // connections = connections.filter((connection) => {
                            //     return connection.favouriteName != item.favouriteName;
                            // });
                            // this.setState({connections});
                            // ToastAndroid.show('Deleted!', ToastAndroid.SHORT);
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
