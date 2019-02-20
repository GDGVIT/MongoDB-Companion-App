import { AsyncStorage } from 'react-native';

export const addConnectionAsync = async (favouriteName, mongoDBUri, database) => {

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

        connections.unshift({favouriteName, mongoDBUri, database });

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
        console.error(error);
        return null;
    }
}

export const getConnectionAsync = async (favouriteName) => {
    try {
        const connections = await AsyncStorage.getItem('connections');
        if(connections != null){
            let connection = JSON.parse(connections).filter((connection) => {
                return connection.favouriteName === favouriteName;
            })[0];
            return connection;
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const DeleteAllConnectionsAsync = async () => {
    try {
        await AsyncStorage.removeItem('connections');

        return 'Success!';
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const addCurrentConnectionAsync = async (favouriteName) => {

    try {
        await AsyncStorage.setItem('currentConnection', favouriteName);
        return 'Success!';
    } catch (error) {
        console.error(error);
        return 'Failed!';
    }
}

export const getCurrentConnectionAsync = async () => {

    try {
        const currentConnectionFavouriteName = await AsyncStorage.getItem('currentConnection');
        return await getConnectionAsync(currentConnectionFavouriteName);
        
    } catch (error) {
        console.error(error);
        return 'Failed!';
    }
}
