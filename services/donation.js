const axios = require('axios');

/* const config = require('../config/config'); */

const { Donation } = require('../models/index');

const findOneDonation = async (id) => {
  try {
    const donation = await axios.get(`${process.env.MP_URL}v1/payments/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        /*         Authorization: `Bearer ${config.development.mpAccessToken}`, */
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    }).then((r) => r.data);
    return donation;
  } catch (err) {
    return err;
  }
};

const createDonation = async (amount) => {
  /*   const url = `${config.development.mpUrl}checkout/preferences`; */
  const url = `${process.env.MP_URL}checkout/preferences`;

  const body = {
    items: [
      {
        id: '1',
        title: 'Donación única',
        description: 'Donación única para la ONG Somos Más',
        /* picture_url: */
        category_id: 'single donation',
        quantity: 1,
        unit_price: amount,
      },
    ],
    /*     back_urls: {
      failure:,
      pending:,
      success:,
    },
    auto_return: 'approved', */
    payment_methods: {
      installments: 1,
    },
    /*     notification_url: `${config.development.ngrokServerUrl}/donations/notification`, */
    notification_url: `${process.env.NGROK_SERVER_URL}donations/notification`,
    statement_descriptor: 'Somos Más ONG',
    external_reference: 'smong267',
  };

  const donation = await axios.post(url, body, {
    headers: {
      'Content-Type': 'application/json',
      /*         Authorization: `Bearer ${config.development.mpAccessToken}`, */
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
    },
  });

  return donation.data;
};

const saveDonation = async (body) => Donation.create({
  data_id: body.data.id,
  type: body.type,
  action: body.action,
  mp_userId: body.user_id,
  date_created: body.date_created,
});

const createSubscription = async (amount) => {
  const url = `${process.env.MP_URL}preapproval`;
  /*   const url = `${config.development.mpUrl}preapproval`; */

  const body = {
    reason: 'Donación mensual',
    auto_recurring: {
      frequency: 1,
      frequency_type: 'months',
      transaction_amount: amount,
      currency_id: 'ARS',
    },
    payer_email: 'test_user_82921974@testuser.com',
    back_url: 'https://es.wikipedia.org/wiki/%C3%89xito',
  };

  const subscription = await axios.post(url, body, {
    headers: {
      'Content-Type': 'application/json',
      /*         Authorization: `Bearer ${config.development.mpAccessToken}`, */
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
    },
  });

  return subscription.data;
};

module.exports = {
  findOneDonation, createDonation, createSubscription, saveDonation,
};
