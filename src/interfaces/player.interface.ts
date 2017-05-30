import { PlayingCard } from './playing-card.interface';

export interface Player {
    playerIndex: number;
    name: string;
    cards: PlayingCard[];
}

