export interface TcgConfig {
  repo: string;
  baseUrl: string;
  setsPath: string;
  cardsPath: (setId: string) => string;
}
