import axios from 'axios';
import { User } from './user';
import env from '../environment';

class UserService {
    private URI: string;
    constructor() {
        // URL of the express server
        this.URI = env.THEBOOKATTIC_URI + 'users';
    }
    getUsers(): Promise<User> {
        return axios.get(this.URI).then((result) => {
            console.log(result);
            return result.data;
        });
    }

    addUser(user: User): Promise<null> {
        return axios
            .post(this.URI, user)
            .then((result) => null)
            .catch((err) => {
                console.log(err);
                return null;
            });
    }

    login(user: User): Promise<User> {
        return axios
            .post(this.URI + '/login', user)
            .then((result) => result.data);
    }
    logout(): Promise<null> {
        return axios.delete(this.URI).then((result) => null);
    }
}

export default new UserService();
