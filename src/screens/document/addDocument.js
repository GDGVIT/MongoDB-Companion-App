import React from 'react';
import { Text, ToastAndroid, View, ActivityIndicator, StyleSheet } from 'react-native';
import { Container, InputText, Button } from '../../components';

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_DOCUMENT = gql`
    mutation createDocument($collectionName: String, $documentData: String){
        createDocument(collectionName: $collectionName, data: $documentData){
            data
        }
    }
`;

export class AddDocument extends React.Component {
    
    static navigationOptions = {
        headerTitle: "Add Document"
    }

    state = {
        documentData: "",
        loading: false
    }

    render() {
        const collectionName = this.props.navigation.getParam("collectionName", null);

        return (
            <Container>
                <InputText multiline={true} placeholder="Document Data" onChangeText={(documentData) => this.setState({documentData})} value={this.state.documentData}/>
                <Mutation mutation={ADD_DOCUMENT} variables={{collectionName, documentData: this.state.documentData}} refetchQueries={() => [`getDocuments`]}>
                    
                    {(createDocument, { data, error }) => {
                        if (error){
                            console.log(error);
                        }
                        return (
                            <Button
                            onPress={ async () => {
                                this.setState({loading: true});
                                try {
                                    const createDocumentResponse = await createDocument();
                                    if(!createDocumentResponse.data.createDocument.data){
                                        throw "Error";
                                    }
                                    this.setState({loading: false});
                                    ToastAndroid.show('Success', ToastAndroid.SHORT);
                                    this.props.navigation.goBack();
                                } catch (error) {
                                    this.setState({loading: false});
                                    ToastAndroid.show('Error', ToastAndroid.SHORT);
                                }
                            }}
                            >Add Document</Button>
                        );
                    }}

                </Mutation>

                {this.state.loading &&
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#000" />
                    </View>
                }

            </Container>
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