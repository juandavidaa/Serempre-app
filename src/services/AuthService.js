import ServiceInterface from "./ServiceInteface";

class AuthService extends ServiceInterface {
  constructor() {
    super();
    this.prefix = "auth/";
  }

  /**
   * Call to the api to login an user an get a Token
   * @param {FormData} formData
   * @returns {Promise}
   */
  async login(formData) {
    this.requestOptions.method = "POST";
    this.requestOptions.body = JSON.stringify(formData);

    return await this.makeRequest("login");
  }

  /**
   * Call to the api to get User data
   * @returns {Promise}
   */
  async getUser() {
    this.myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access_token")}`
    );
    this.requestOptions.method = "GET";
    const response = await this.makeRequest("me");

    return response;
  }
}
export default AuthService;
