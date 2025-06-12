import { CardTokenizationService } from '../../../ports/TokenCard';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const URL_BASE = process.env.NODE_URL_BASE;
const API_PUBLIC_KEY = process.env.NODE_API_PUBLIC_KEY;

export class HttpCardTokenizationService implements CardTokenizationService {
  async tokenizeCard(cardData: {
    number: string;
    exp_month: string;
    exp_year: string;
    cvc: string;
    card_holder: string;
  }): Promise<any> {
    try {
      const response = await axios.post(
        `${URL_BASE}tokens/cards`,
        {
          number: cardData.number,
          cvc: cardData.cvc,
          exp_month: cardData.exp_month,
          exp_year: cardData.exp_year,
          card_holder: cardData.card_holder,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_PUBLIC_KEY}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const data = error.response?.data;
        throw new Error(`Error del servicio externo: ${status} - ${JSON.stringify(data)}`);
      } else {
        throw new Error("Error inesperado al tokenizar tarjeta");
      }
    }
  }
}
