import * as axios from "axios";
export const http = axios.create({
    timeout: 5000
});

export class BaseApi {
    constructor() {
        this.baseUrl = '/API';
    }

    combineUrl(url) {
        return `${this.baseUrl}${url}`;
    }

    parseEntity(entity) {
        let response = {};

        let originKeys = Object.keys(entity);
        let modifiedKeys = originKeys.map(key => {
            let replaced = key.replace('_', '');
            replaced = replaced.replace(replaced[0], replaced[0].toLowerCase());
            return replaced;
        });

        originKeys.forEach((x, index) => response[modifiedKeys[index]] = entity[originKeys[index]]);

        return response;
    }
}