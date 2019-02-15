import { AsyncStorage } from 'react-native';

export const addConnectionAsync = async (favouriteName, mongoDBString) => {

    try {

        let connectionsString = await AsyncStorage.getItem('connections');

        if(connectionsString == null){
            connectionsString = "[]"
        }

        let connections = JSON.parse(connectionsString);

        let findConnection = connections.find((connection) => {
            return connection.favouriteName == favouriteName;
        });

        if(findConnection){
            return 'Favourite Already Exists!';
        }

        connections.unshift({favouriteName, mongoDBString});

        await AsyncStorage.setItem('connections', JSON.stringify(connections));

        return 'Success!';
    } catch (error) {
        console.error(error);
        return 'Failed!';
    }
}

export const deleteConnectionAsync = async (favouriteName) => {

    try {

        let connectionsString = await AsyncStorage.getItem('connections');

        if(connectionsString == null){
            connectionsString = "[]"
        }

        let connections = JSON.parse(connectionsString);

        connections = connections.filter((connection) => {
            return connection.favouriteName != favouriteName;
        })

        await AsyncStorage.setItem('connections', JSON.stringify(connections));

        return 'Success!';
    } catch (error) {
        console.error(error);
        return 'Failed!';
    }
}

export const getConnectionsAsync = async () => {
    try {
        const value = await AsyncStorage.getItem('connections');
        if(value != null){
            return JSON.parse(value);
        }
        return null;
    } catch (error) {
        return null;
    }
}
