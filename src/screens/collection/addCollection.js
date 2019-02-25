import React from 'react';
import { Text, ToastAndroid, View, ActivityIndicator, StyleSheet } from 'react-native';
import { Container, InputText, Button } from '../../components';

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_COLLECTION = gql`
    mutation createCollection($collectionName: String){
        createCollection(name: $collectionName){
            name
        }
    }
`;

export class AddCollection extends React.Component {
    
    static navigationOptions = {
        title: 'Add Collection',
    };

    state = {
        collectionName: "",
        loading: false
    }

    render() {
        return (
            <Container>
                <InputText placeholder="Collection Name" onChangeText={(collectionName) => this.setState({collectionName})} value={this.state.collectionName}/>
                <Mutation mutation={ADD_COLLECTION} variables={{collectionName: this.state.collectionName}} refetchQueries={() => [`getCollections`]}>
                    

                    {(createCollection, { data, error }) => {
                        if (error){
                            console.log(error);
                        }
                        return (
                            <Button
                            onPress={ async () => {
                                this.setState({loading: true});
                                try {
                                    await createCollection();
                                    this.setState({loading: false});
                                    ToastAndroid.show('Success', ToastAndroid.SHORT);
                                    this.props.navigation.goBack();
                                } catch (error) {
                                    this.setState({loading: false});
                                    ToastAndroid.show('Error', ToastAndroid.SHORT);
                                }
                            }}
                            >Add Collection</Button>
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