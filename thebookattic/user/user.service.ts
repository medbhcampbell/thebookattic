import axios from 'axios';
import { User } from './user';

class UserService {
    private URI: string;
    constructor() {
        // URL of the express server
        this.URI = 'https://zp8675rt3l.execute-api.us-west-2.amazonaws.com/test/users';
    }
    getLogin(): Promise<User> {
        // withCredentials sends our cookies with the request.
        return axios.get(this.URI).then(result=>{
            console.log(result);
            return result.data
        });
    }

    login(user: User): Promise<User> {
        return axios.post(this.URI, user).then(result => result.data).catch(err => err);
    }
    logout(): Promise<null> {
        return axios.delete(this.URI).then(result => null);
    }
}

export default new UserService();