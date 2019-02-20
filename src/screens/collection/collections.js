import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, ScrollView, ToastAndroid, StyleSheet } from 'react-native';

import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Colors from '../../config/colors'

const GET_COLLECTIONS = gql`
    query getCollections{
        collections{
            name
        }
    }
`;

const DELETE_COLLECTION = gql`
    mutation deleteCollection($collectionName: String){
        deleteCollection(collectionName: $collectionName)
    }
`;

export class Collections extends React.Component {

    state = {
        loading: false
    }

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

                                        <Mutation mutation={DELETE_COLLECTION} variables={{collectionName: collection.name}} refetchQueries={() => [`getCollections`]}>
                                            {(deleteDocument, { data, error }) => {
                                                if (error){
                                                    console.log(error);
                                                }
                                                return (

                                                    <TouchableOpacity
                                                    style={{
                                                        backgroundColor: Colors.pomegranate,
                                                        paddingHorizontal: 15,
                                                        paddingVertical: 20,
                                                    }}
                                                    onPress={async () => {
                                                        this.setState({loading: true});
                                                        try {
                                                            await deleteDocument();
                                                            this.setState({loading: false});
                                                            ToastAndroid.show('Deleted!', ToastAndroid.SHORT);
                                                        } catch (error) {
                                                            this.setState({loading: false});
                                                            ToastAndroid.show('Error', ToastAndroid.SHORT);
                                                        }
                                                    }}
                                                    >
                                                        <Text>X</Text>
                                                    </TouchableOpacity>
                                                    );
                                                }}
                                        </Mutation>
                                    </View>
                                ))}
                        </ScrollView>
                    );
                }}
            </Query>

            {this.state.loading &&
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF88'
    }
});