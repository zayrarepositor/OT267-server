/* eslint-disable no-unused-vars */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const donations = [
      {
        data_id: '1308062372',
        type: 'payment',
        action: 'payment.created',
        mp_userId: '1196390096',
        date_created: new Date('2022-09-15T15:02:04Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        data_id: '1308062372',
        type: 'payment',
        action: 'payment.created',
        mp_userId: '1196390096',
        date_created: new Date('2022-09-15T15:02:04Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        data_id: '1308062372',
        type: 'payment',
        action: 'payment.created',
        mp_userId: '1196390096',
        date_created: new Date('2022-09-15T15:02:04Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        data_id: '1308062372',
        type: 'payment',
        action: 'payment.created',
        mp_userId: '1196390096',
        date_created: new Date('2022-09-15T15:02:04Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        data_id: '1308062372',
        type: 'payment',
        action: 'payment.created',
        mp_userId: '1196390096',
        date_created: new Date('2022-09-15T15:02:04Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        data_id: '1308062372',
        type: 'payment',
        action: 'payment.created',
        mp_userId: '1196390096',
        date_created: new Date('2022-09-15T15:02:04Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        data_id: '1308062372',
        type: 'payment',
        action: 'payment.created',
        mp_userId: '1196390096',
        date_created: new Date('2022-09-15T15:02:04Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        data_id: '1308062372',
        type: 'payment',
        action: 'payment.created',
        mp_userId: '1196390096',
        date_created: new Date('2022-09-15T15:02:04Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        data_id: '1308062372',
        type: 'payment',
        action: 'payment.created',
        mp_userId: '1196390096',
        date_created: new Date('2022-09-15T15:02:04Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        data_id: '1308062372',
        type: 'payment',
        action: 'payment.created',
        mp_userId: '1196390096',
        date_created: new Date('2022-09-15T15:02:04Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        data_id: '1308062372',
        type: 'payment',
        action: 'payment.created',
        mp_userId: '1196390096',
        date_created: new Date('2022-09-15T15:02:04Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        data_id: '1308062372',
        type: 'payment',
        action: 'payment.created',
        mp_userId: '1196390096',
        date_created: new Date('2022-09-15T15:02:04Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        data_id: '1308062372',
        type: 'payment',
        action: 'payment.created',
        mp_userId: '1196390096',
        date_created: new Date('2022-09-15T15:02:04Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Donations', donations, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Donations', null, {});
  },
};
