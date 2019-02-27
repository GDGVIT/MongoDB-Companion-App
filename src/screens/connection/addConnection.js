import React from 'react';
import { Text, ToastAndroid } from 'react-native';

import { Container, InputText, Button } from '../../components';
import { HeaderWithDrawer } from '../../components/header';
import { addConnectionAsync, getConnectionsAsync } from '../../controllers';

export class AddConnection extends React.Component {

    static navigationOptions = {
        title: 'Add Connection'
    };

    state = {
        mongoDBUri: "",
        databaseName: "",
        favouriteName: ""
    }

    addConnection = async () => {
        if(this.state.mongoDBUri && this.state.databaseName && this.state.favouriteName){
            const result = await addConnectionAsync(this.state.favouriteName, this.state.mongoDBUri, this.state.databaseName);
            ToastAndroid.show(result, ToastAndroid.SHORT);
        }
        else{
            ToastAndroid.show('All fields are required!', ToastAndroid.SHORT);
        }
    }

    render() {
        return (
            <Container>
                <InputText placeholder="MongoDB URI" onChangeText={(mongoDBUri) => this.setState({mongoDBUri})}/>
                <InputText placeholder="Database Name" onChangeText={(databaseName) => this.setState({databaseName})}/>
                <InputText placeholder="Favourite Name" onChangeText={(favouriteName) => this.setState({favouriteName})}/>
                <Button onPress={() => this.addConnection()}>Add</Button>
                <Text style={{textAlign: 'center'}}>{
                    this.state.mongoDBUri || this.state.databaseName ? 
                    `MongoDBUri: ${this.state.mongoDBUri}/${this.state.databaseName}` :
                    ``
                }</Text>
            </Container>
        );
    }
}
