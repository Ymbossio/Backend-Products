import { CardTokenizationService } from '../../ports/TokenCard';

export class TokenizeCard {
  constructor(private cardTokenizationService: CardTokenizationService) {}

  async execute(cardData: {
    number: string;
    exp_month: string;
    exp_year: string;
    cvc: string;
    card_holder: string;
  }): Promise<any> {
    return await this.cardTokenizationService.tokenizeCard(cardData);
  }
}
