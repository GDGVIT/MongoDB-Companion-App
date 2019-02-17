import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import { Button } from '../../components'

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Colors from '../../config/colors'

const GET_DOCUMENT = gql`
    query getDocument($collectionName: String, $documentId: String){
        collection(name: $collectionName){
            name,
            document(id: $documentId){
                data
            }
        }
    }
`;

export class Document extends React.Component {

    state = {
        documentData: ''
    }

    render() {
        const collectionName = this.props.navigation.getParam("collectionName", null);
        const documentId = this.props.navigation.getParam("documentId", null);

        return (
            <View>
                <Text>Document</Text>
                <Query query={GET_DOCUMENT} variables={{collectionName, documentId}}>
                {({ data, loading, error }) => {
                    if (loading) return <ActivityIndicator size="large" color="#000" />;
                    if (error) {
                        console.error(error)
                        return <Text> Error Fetching Data</Text>
                    };
                    // Handle errors above ***
                    return (
                        <View>
                            <TextInput
                            multiline = {true}
                            onChangeText={(documentData) => this.setState({documentData})}
                            value={data.collection.document.data}
                            />
                            <Button>Save</Button>
                        </View>
                    
                    );
                }}
            </Query>
            </View>
        );
    }
}
