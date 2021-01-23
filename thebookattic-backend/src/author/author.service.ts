import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';

const pool = new Pool();

dotenv.config();

// function testConnect1() {
//     pool.connect().then(async(cli: PoolClient) => {
//         const testQuery = 'select * from authors;'
//         const result = await cli.query(testQuery);
//         console.log(result.rows);
//         cli.release();
//         quit();
//     });
// }

function testConnect2() {
    //pool.connect().then(async() => {
        const testQuery = 'select * from authors;'
        pool.query(testQuery).then((result) => {
            console.log(JSON.stringify(result));
        });
    //});
    quit();
}

testConnect2();

function quit() {
    pool.end();
    process.exit();
}