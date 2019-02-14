import React from 'react';
import { Text } from 'react-native';

import Container from '../../components/container';
import InputText from '../../components/inputText';
import Button from '../../components/button';

export class AddConnection extends React.Component {
    
    static navigationOptions = {
        headerTitle: "Add Connection"
    }

    render() {
        return (
            <Container>
                <InputText placeholder="MongoDB URI"/>
                <InputText placeholder="Database Name"/>
                <Button>Submit</Button>
            </Container>
        );
    }
}
