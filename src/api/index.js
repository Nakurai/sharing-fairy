const PUBLIC_IP_RETRIEVAL_SERVICE_URL = "https://api.ipify.org?format=json";

export async function getPublicIp() {
  try {
    const response = await fetch(PUBLIC_IP_RETRIEVAL_SERVICE_URL);
    const data = await response.json();
    if (data.ip) {
      return data.ip;
    } else {
      throw new Error("no ip address in the response ", JSON.strignify(data));
    }
  } catch (error) {
    console.log("ERROR ", error.message);
    throw new Error("error while fetching the public IP");
  }
}
