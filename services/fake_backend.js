import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const mockApi = new MockAdapter(axios);

import { JWTTOKEN, loginUrl } from "../config";

export function configureFakeBackend() {
    console.log("configuring fake backend");
    return mockApi.onPost(loginUrl).reply(config => {
        console.log("fake login post")
        return [200, { JWTTOKEN: "tester token", user: "test" }];
    });
}
