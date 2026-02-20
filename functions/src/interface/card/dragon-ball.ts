/**
 * Dragon Ball Fusion TCG specific card structure
 */
export interface DragonBallCard {
  id: string;
  code: string;
  rarity: string;
  name: string;
  color: string;
  images: {
    small: string;
    large: string;
  };
  cardType: string;
  cost?: string;
  specifiedCost?: string;
  power?: string;
  comboPower?: string;
  features?: string;
  effect?: string;
  getIt?: string;
  set: {
    id: string;
    name: string;
  };
}
