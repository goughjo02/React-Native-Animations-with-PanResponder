import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { AuthApi, AuthConstants } from "../config";

export const configureFakBackend = () => {
  const mockApi = new MockAdapter(axios, { delayResponse: 2000 });
  mockApi.onPost(AuthApi.loginUrl()).reply(config => {
    let parsed = JSON.parse(config.data);
    // console.log("fake backend sign in")
    // console.log(parsed)
    var users = [
      {
        id: 1,
        username: "joe",
        password: "password"
      },
      {
        id: 2,
        username: "niamh",
        password: "password"
      }
    ];
    var reqUser = parsed.username;
    var reqPassword = parsed.password;
    let filteredUsers = users.filter(user => {
      // console.log(user.username === reqUser && user.password === reqPassword)
      // console.log(user.username, user, user.password, password)
      return (
        user.username.toLowerCase() === reqUser.toLowerCase() &&
        user.password.toLowerCase() === reqPassword.toLowerCase()
      );
    });
    // console.log(filteredUsers)
    if (filteredUsers.length) {
      let user = filteredUsers[0].username;
      return [
        200,
        { [AuthConstants.localStateKey()]: "tester token", user: user }
      ];
    } else return [401, { text: "user not recognised" }];
  });
};
