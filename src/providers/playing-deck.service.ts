import { Injectable } from '@angular/core';

import { PlayingCard } from '../interfaces/playing-card.interface';
import { DECK } from './playing-deck';

@Injectable()
export class PlayingDeckService {
    public getDeck(): PlayingCard[] {
        return DECK;
    }
}
