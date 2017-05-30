import { Component, OnInit } from '@angular/core';

import { PlayingDeckService } from '../providers/playing-deck.service';
import { Player } from '../interfaces/player.interface';
import { PlayingCard } from '../interfaces/playing-card.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [PlayingDeckService]
})
export class AppComponent implements OnInit {
    public unshuffledDeck: PlayingCard[];
    public shuffledDeck: PlayingCard[];
    public shuffleCount: number;
    public numberOfPlayers: number;
    public dealtCards: Player[];
    public haveDealtCards: boolean;

    constructor(public playingDeckService: PlayingDeckService) { }

    ngOnInit(): void {
        this.unshuffledDeck = this.playingDeckService.getDeck();
        this.shuffledDeck = [];
        this.shuffleCount = 0;
        this.numberOfPlayers = 1;
        this.dealtCards = [];
        this.haveDealtCards = false;
    }

    public shuffleDeck(): void {
        this.resetDecks();
        while (this.shuffleCount < 52) {
            this.shuffleCard();
        }
    }

    public shuffleCard(): void {
        const cardIndex: number = Math.floor((Math.random() * 52));
        if (!this.unshuffledDeck[cardIndex].hasBeenShuffled) {
            this.unshuffledDeck[cardIndex].hasBeenShuffled = true;
            this.shuffledDeck.push(this.unshuffledDeck[cardIndex]);
            this.shuffleCount++;
        }
    }

    public resetDecks(): void {
        this.unshuffledDeck.forEach(card => {
            card.hasBeenShuffled = false;
        });
        this.shuffledDeck = [];
        this.shuffleCount = 0;
        this.dealtCards = [];
        this.haveDealtCards = false;
    }

    get cardsPerPlayer(): number {
        if (this.numberOfPlayers > 0 && this.numberOfPlayers < 53) {
            return Math.floor(52 / this.numberOfPlayers);
        } else {
            return 0;
        }
    }

    public shuffleAndDealCards(): void {
        this.shuffleDeck();
        this.dealCards();
        this.haveDealtCards = true;
    }

    public dealCards(): void {
        for (let playerNumber = 1; playerNumber <= this.numberOfPlayers; playerNumber++) {
            this.dealtCards.push({
                playerIndex: (playerNumber - 1),
                name: 'Player ' + playerNumber,
                cards: this.shuffledDeck.slice(0, this.cardsPerPlayer)
            });
            this.shuffledDeck.splice(0, this.cardsPerPlayer);
        }
    }
};
