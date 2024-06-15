import { Db } from 'mongodb';
module.exports = {
  async up(db: Db) {
    console.log('In migration script');
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
  },
};
