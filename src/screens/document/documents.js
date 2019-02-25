import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, ScrollView, ToastAndroid, StyleSheet, Alert } from 'react-native';
import { Button } from '../../components';

import { Query, Mutation } from 'react-apollo';
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

const DELETE_DOCUMENT = gql`
    mutation deleteDocument($collectionName: String, $documentId: ID){
        deleteDocument(collectionName: $collectionName, documentId: $documentId)
    }
`;

export class Documents extends React.Component {

    static navigationOptions = {
        title: 'Documents',
    };

    state = {
        loading: false
    }

    deleteDocument = (deleteDocument, documentId) => {
        Alert.alert(
            'Are you sure?',
            `Delete ${documentId} document`,
            [
                {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
                },
                {text: 'OK', onPress: async () => {
                    this.setState({loading: true});
                    try {
                        await deleteDocument();
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
        const collectionName = this.props.navigation.getParam("collectionName", null);

        return (
            <View>
                <Query query={GET_DOCUMENTS} variables={{collectionName}}>
                {({ data, loading, error }) => {
                    if (loading) return <ActivityIndicator size="large" color="#000" />;
                    if (error) {
                        console.error(error)
                        return <Text> Error Fetching Data</Text>
                    };
                    
                    return (
                        <ScrollView>
                        <Button onPress={() => this.props.navigation.navigate('AddDocument', {collectionName})}>Add Document</Button>
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

                                        <Mutation mutation={DELETE_DOCUMENT} variables={{collectionName, documentId: documentData._id}} refetchQueries={() => [`getDocuments`]}>
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
                                                    onPress={ () => this.deleteDocument(deleteDocument, documentData._id)}
                                                    >
                                                        <Text>X</Text>
                                                    </TouchableOpacity>
                                                    );
                                                }}
                                        </Mutation>

                                    </View>
                                    )}
                                    )}
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