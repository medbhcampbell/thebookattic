import { Client } from 'pg';

class GenreService {

    async getGenres(): Promise<Genre[]> {
        const client = new Client();
        await client.connect();

        return await client.query('select id, name from genres').then((res: any)=>{
            client.end();
            return res.rows as Genre[];
        }).catch((err: any)=>{
            client.end();
            console.error(err);
            return [];
        });
    }

    async getGenreById(id: string): Promise<Genre | null> {
        const client = new Client();
        await client.connect();

        return await client.query('select id, name from genres where id=$1::int', [Number(id)]).then((res: any) => {
            client.end();
            return res.rows[0] as Genre;
        }).catch((err: any) => {
            client.end();
            console.error(err);
            return null;
        });
    }

    async addGenre(name: string): Promise<boolean> {
        const client = new Client();
        await client.connect();

        return await client.query('insert into genres (name) values ($1::text)', [name]).then((res: any) => {
            client.end();
            return true;
        }).catch((err: any) => {
            client.end();
            console.error(err);
            return false;
        });
    }

    async removeGenre(id: string): Promise<boolean> {
        const client = new Client();
        await client.connect();

        return await client.query('delete from genres where id=$1::int', [Number(id)]).then((res: any) => {
            client.end();
            return true;
        }).catch((err: any) => {
            client.end();
            console.error(err);
            return false;
        });
    }
}

class Genre {
    id: number = 0;
    name: string = '';
}

export default GenreService;