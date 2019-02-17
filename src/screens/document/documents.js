import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, ScrollView } from 'react-native';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Colors from '../../config/colors'

const GET_DOCUMENTS = gql`
    query getDocuments($collectionName: String){
        collection(name: $collectionName){
            name,
            documents{
                data
            }
        }
    }
`;
export class Documents extends React.Component {

    render() {
        const collectionName = this.props.navigation.getParam("collectionName", null);

        return (
            <View>
                <Text>Documents</Text>
                <Query query={GET_DOCUMENTS} variables={{collectionName}}>
                {({ data, loading, error }) => {
                    if (loading) return <ActivityIndicator size="large" color="#000" />;
                    if (error) {
                        console.error(error)
                        return <Text> Error Fetching Data</Text>
                    };
                    // Handle errors above ***
                    return (
                        <ScrollView>
                            {data.collection && data.collection.documents &&
                                data.collection.documents.map(document => {
                                    const documentData = JSON.parse(document.data);

                                    return (
                                        <View style={{flexDirection: 'row'}} key={document.data}>
                                        <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            paddingHorizontal: 15,
                                            paddingVertical: 20,
                                            backgroundColor: Colors.cararra,
                                            borderBottomColor: '#fff',
                                            borderBottomWidth: 0.2
                                        }}
                                        onPress={() => this.props.navigation.navigate("Document", {
                                            collectionName,
                                            documentId: documentData._id
                                        })}
                                        >
                                            <Text>{documentData._id}</Text>
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
                                    )}
                        </ScrollView>
                    );
                }}
            </Query>
            </View>
        );
    }
}
