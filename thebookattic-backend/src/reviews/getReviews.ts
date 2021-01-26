exports.handler = async () => {
    const { Client } = require('pg');
    const client = new Client();
    await client.connect();
    const res = await client.query(`select * from reviews`);
    await client.end();
    const response = {
        statusCode: 200,
        body: {
            reviews: res.rows
        }
    };
    return response;
};
