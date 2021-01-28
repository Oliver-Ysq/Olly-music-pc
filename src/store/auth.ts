import {makeAutoObservable} from "mobx";

class AuthStore {

    values = {
        username: "",
        password: "",
    };

    constructor() {
        makeAutoObservable(this);
    }
}

export default new AuthStore();
