import React from 'react';
import { View, Text, ActivityIndicator, ScrollView, TextInput, ToastAndroid, StyleSheet, Alert } from 'react-native';
import { Button } from '../../components'

import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

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

const EDIT_DOCUMENT = gql`
    mutation editDocument($collectionName: String, $documentId: ID, $documentData: String){
        editDocument(collectionName: $collectionName, documentId: $documentId, data: $documentData)
    }
`;

export class Document extends React.Component {

    static navigationOptions = {
        headerTitle: "Document"
    }

    render() {
        const collectionName = this.props.navigation.getParam("collectionName", null);
        const documentId = this.props.navigation.getParam("documentId", null);

        return (
            <ScrollView>
                <Query query={GET_DOCUMENT} variables={{collectionName, documentId}}>
                {({ data, loading, error }) => {
                    if (loading) return <ActivityIndicator size="large" color="#000" />;
                    if (error) {
                        console.error(error)
                        return <Text> Error Fetching Data</Text>
                    };
                    return (
                        <View>
                            <EditDocument {...this.props} documentData={data.collection.document.data}/>
                        </View>
                    
                    );
                }}
                </Query>
            </ScrollView>
        );
    }
}


class EditDocument extends React.Component {

    state = {
        documentData: '',
        loading: false
    }

    editDocument = (editDocument, documentId) => {
        Alert.alert(
            'Are you sure?',
            `Edit ${documentId} document`,
            [
                {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
                },
                {text: 'OK', onPress: async () => {
                    this.setState({loading: true});
                    try {
                        await editDocument();
                        this.setState({loading: false});
                        ToastAndroid.show('Success', ToastAndroid.SHORT);
                    } catch (error) {
                        this.setState({loading: false});
                        ToastAndroid.show('Error', ToastAndroid.SHORT);
                    }
                }},
            ],
        );
    }

    componentDidMount() {
        this.setState({documentData: this.props.documentData});
    }

    render() {

        const collectionName = this.props.navigation.getParam("collectionName", null);
        const documentId = this.props.navigation.getParam("documentId", null);

        return (
            <View>
                <TextInput
                multiline = {true}
                onChangeText={(documentData) => this.setState({documentData})}
                value={this.state.documentData}
                />
                <Mutation mutation={EDIT_DOCUMENT} variables={{collectionName, documentId, documentData: this.state.documentData}}>
                    {(editDocument, { data, error }) => {
                        if (error){
                            console.log(error);
                        }
                        return (
                            <Button
                            onPress={ () => this.editDocument(editDocument, documentId) }
                            >Save</Button>
                        );
                    }}
                </Mutation>

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