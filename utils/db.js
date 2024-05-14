import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (err) {
        this.dbClient = false;
      } else {
        this.dbClient = client.db(database);
      }
    });
  }

  isAlive() {
    return !!this.dbClient;
  }

  async nbUsers() {
    const dbclient = this.dbClient
    return dbclient.collection('users').countDocuments();
  }

  async nbFiles() {
    const dbclient = this.dbClient
    return dbclient.collection('files').countDocuments();
  }
}

export default new DBClient();