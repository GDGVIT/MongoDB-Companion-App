import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, ScrollView } from 'react-native';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Colors from '../../config/colors'

const GET_COLLECTIONS = gql`
    query getCollections{
        collections{
            name
        }
    }
`;

export class Collections extends React.Component {

    render() {
        return (
            <View>
                <Text>Collections</Text>
                <Query query={GET_COLLECTIONS}>
                {({ data, loading, error }) => {
                    if (loading) return <ActivityIndicator size="large" color="#000" />;
                    if (error) {
                        console.error(error)
                        return <Text> Error Fetching Data</Text>
                    };
                    // Handle errors above ***
                    return (
                        <ScrollView>
                            {data.collections &&
                                data.collections.map(collection => (
                                    <View style={{flexDirection: 'row'}} key={collection.name}>
                                        <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            paddingHorizontal: 15,
                                            paddingVertical: 20,
                                            backgroundColor: Colors.cararra,
                                            borderBottomColor: '#fff',
                                            borderBottomWidth: 0.2
                                        }}
                                        onPress={() => this.props.navigation.navigate("Documents", {
                                            collectionName: collection.name
                                        })}
                                        >
                                            <Text>{collection.name}</Text>
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
                                ))}
                        </ScrollView>
                    );
                }}
            </Query>
            </View>
        );
    }
}
