import ServiceInterface from "./ServiceInteface";
import AuthService from "./AuthService";
class CompanyService extends ServiceInterface {
  constructor() {
    super();
    this.authService = new AuthService();
    this.prefix = "admin/clients";
    this.myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access_token")}`
    );
  }

  async getUser() {
    this.authService.getUser();
  }
  /**
   * Call to the api to get the list of companies
   * @returns {Promise}
   */
  async updateUserName(name) {
    this.requestOptions.method = "PATCH";
    const response = await this.makeRequest(`/updateName/${name}`);

    return response;
  }
}

export default CompanyService;
