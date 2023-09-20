class ServiceInterface {
  constructor() {
    this.url = process.env.REACT_APP_API_URL || "http://localhost:8000/api/";
    this.myHeaders = new Headers();
    this.myHeaders.append("mode", "no-cors");
    this.myHeaders.append("Accept", "application/json");
    this.myHeaders.append("Content-Type", "application/json");
    this.requestOptions = {
      headers: this.myHeaders,
    };
    this.prefix = "";
  }

  async makeRequest(url = "") {
    const response = await fetch(
      `${this.url}${this.prefix}${url}`,
      this.requestOptions
    );
    //const response = await request.json();

    return response;
  }
}

export default ServiceInterface;
