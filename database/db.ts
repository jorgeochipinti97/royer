import mongoose from 'mongoose';

const mongoConnection = {
    isConnected: 0
}

export const connect = async() => {

    if ( mongoConnection.isConnected ) {
        console.log('Ya estabamos conectados');
        return;
    }

    if ( mongoose.connections.length > 0 ) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;

        if ( mongoConnection.isConnected === 1 ) {
            console.log('Usando conexión anterior');
            return;
        }

        await mongoose.disconnect();
    }

    await mongoose.connect( process.env.MONGO_URI_NEW || '');
    mongoConnection.isConnected = 1;
    console.log('Conectado a MongoDB:', process.env.MONGO_URI_NEW );
}

export const disconnect = async() => {
    
    if ( process.env.NODE_ENV === 'development' ) return;

    if ( mongoConnection.isConnected === 0 ) return;

    await mongoose.disconnect();
    mongoConnection.isConnected = 0;

    console.log('Desconectado de MongoDB');
}