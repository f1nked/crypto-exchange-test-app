import axios from "axios";

const ENDPOINT = "https://api.changenow.io/v2/exchange";
const API_KEY = "c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd";

export const getCurrencies = async () => {
  try {
    const response = await axios.get(`${ENDPOINT}/currencies`, {
      params: {
        active: "",
        flow: "standard",
        buy: "",
        sell: "",
      },
      headers: {
        "x-changenow-api-key": API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMinAmount = async (params: any) => {
  try {
    const response = await axios.get(`${ENDPOINT}/min-amount`, {
      params: {
        fromCurrency: params.fromCurrency,
        toCurrency: params.toCurrency,
        fromNetwork: params.fromNetwork,
        toNetwork: params.toNetwork,
        flow: "standard",
      },
      headers: {
        "x-changenow-api-key": API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getEstimatedAmount = async (params: any) => {
  try {
    const response = await axios.get(`${ENDPOINT}/estimated-amount`, {
      params: {
        fromCurrency: params.fromCurrency,
        toCurrency: params.toCurrency,
        fromAmount: params.fromAmount,
        toAmount: params.toAmount,
        fromNetwork: params.fromNetwork,
        toNetwork: params.toNetwork,
        flow: "",
        type: params.type,
        useRateId: "",
      },
      headers: {
        "x-changenow-api-key": API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
