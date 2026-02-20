/**
 * Digimon TCG specific card structure
 */
export interface DigimonCard {
  id: string;
  code: string;
  name: string;
  level?: string;
  colors: string[];
  images: {
    small: string;
    large: string;
  };
  cardType: string;
  form?: string;
  attribute?: string;
  type?: string;
  dp?: string;
  playCost?: string;
  digivolveCost1?: string;
  digivolveCost2?: string;
  effect?: string;
  inheritedEffect?: string;
  securityEffect?: string;
  notes?: string;
  set: {
    id: string;
    name: string;
  };
  rarity?: string;
}
