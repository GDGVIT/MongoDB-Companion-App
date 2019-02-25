import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, ScrollView, ToastAndroid, StyleSheet, Alert } from 'react-native';
import { Button, ListItem } from '../../components';
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

    static navigationOptions = {
        title: 'Collections',
    };

    state = {
        loading: false
    }

    deleteCollection = (deleteCollection, collectionName) => {
        Alert.alert(
            'Are you sure?',
            `Delete ${collectionName} collection`,
            [
                {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
                },
                {text: 'OK', onPress: async () => {
                    this.setState({loading: true});
                    try {
                        await deleteCollection();
                        this.setState({loading: false});
                        ToastAndroid.show('Deleted!', ToastAndroid.SHORT);
                    } catch (error) {
                        this.setState({loading: false});
                        ToastAndroid.show('Error', ToastAndroid.SHORT);
                    }
                }},
            ],
        );
    }

    render() {
        return (
            <View>
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
                            <Button onPress={() => this.props.navigation.navigate('AddCollection')}>Add Collection</Button>
                            {data.collections &&
                                data.collections.map(collection => (
                                    <View key={collection.name}>
                                    <Mutation mutation={DELETE_COLLECTION} variables={{collectionName: collection.name}} refetchQueries={() => [`getCollections`]}>
                                    {(deleteCollection, { data, error }) => {
                                        if (error){
                                            console.log(error);
                                        }
                                        return (
                                            <ListItem
                                            icon="plug"
                                            onPress={() => this.props.navigation.navigate("Documents", {
                                                collectionName: collection.name
                                            })}
                                            onDeletePress={() => this.deleteCollection(deleteCollection, collection.name)}
                                            >
                                                {collection.name}
                                            </ListItem>
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
