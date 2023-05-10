const PgPool = require('pg-pool');
const maxPoolSize = 10, connectionTimeoutMillis = 1000, idleTimeoutMillis = 1000
const dbConfig = require(require('path').resolve('cypress.config.js')).e2e.db

const pgPool = new PgPool({ ...dbConfig, max: maxPoolSize, connectionTimeoutMillis, idleTimeoutMillis });

const pgQuery = async ({ query, values }) => {
    const client = await pgPool.connect();
    try {
        const response = await client.query({ text: query, values });
        const result = (Object.keys(response).includes('rows')) ? response.rows : {};
        return result;
    } finally {
        client.release();
    }
};

pgQuery.closePool = async () => {
    await pgPool.end();
};

module.exports = { pgQuery };
