import httpService from "../../httpService";
class api {
  doSignIn = (email, password) => {
    return httpService.fetch({
      path: "auth/login/",
      method: "POST",
      body: {
        email,
        password
      },
      sendToken: false
    });
  };

  doSignUp = (first_name, last_name, phone_number, password, email) => {
    return httpService.fetch({
      path: "auth/register/",
      method: "POST",
      body: {
        first_name,
        last_name,
        phone_number,
        password,
        email
      },
      sendToken: false
    });
  };

  doFetchLessons = () => {
    return httpService.fetch({
      path: "auth/login/",
      method: "GET",
      body: {},
      sendToken: false
    });
  };
}

export default new api();
