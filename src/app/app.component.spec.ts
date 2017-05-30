import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, ElementRef, Renderer } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Player } from '../interfaces/player.interface';
import { PlayingCard } from '../interfaces/playing-card.interface';

let appComponent: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let buttonElement: HTMLInputElement;
let rendered: any;

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AppComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        appComponent = fixture.componentInstance;
        const buttonDebugElment: DebugElement = fixture.debugElement.query(By.css('button'));
        buttonElement = buttonDebugElment.nativeElement as HTMLInputElement;
        rendered = fixture.debugElement.nativeElement;
    });

    it('should create the app', async(() => {
        expect(appComponent).toBeTruthy();
    }));

    // template

    it('should render title in a h1 tag', async(() => {
        expect(rendered.querySelector('h1').textContent).toContain('card dealer');
    }));

    it('should render number of players label and input', async(() => {
        expect(rendered.querySelector('#label---number-of-players')
            .textContent).toContain('number of players');
        expect(rendered.querySelector('#input---number-of-players')).toBeTruthy();
    }));

    it('should render shuffle and deal cards button', async(() => {
        expect(rendered.querySelector('#button---shuffle-and-deal-cards')
            .textContent).toContain('shuffle and deal cards');
        expect(rendered.querySelector('#input---number-of-players')).toBeTruthy();
    }));

    it('should shuffleAndDealCards() on template button click', async(() => {
        appComponent.ngOnInit();
        appComponent.numberOfPlayers = 2;
        buttonElement.dispatchEvent(new Event('click'));
        expect(appComponent.dealtCards.length).toBe(appComponent.numberOfPlayers);
    }));

    // logic

    it('should have unshuffledDeck be length of 52', async(() => {
        appComponent.ngOnInit();
        expect(appComponent.unshuffledDeck.length).toBe(52);
    }));

    it('should have 10 cardsPerPlayer for 5 numberOfPlayers', async(() => {
        appComponent.ngOnInit();
        appComponent.numberOfPlayers = 5;
        expect(appComponent.cardsPerPlayer).toBe(10);
    }));

    it('should have 0 cardsPerPlayer for 0 numberOfPlayers', async(() => {
        appComponent.ngOnInit();
        appComponent.numberOfPlayers = 0;
        expect(appComponent.cardsPerPlayer).toBe(0);
    }));

    it('should have 0 cardsPerPlayer for 53 numberOfPlayers', async(() => {
        appComponent.ngOnInit();
        appComponent.numberOfPlayers = 53;
        expect(appComponent.cardsPerPlayer).toBe(0);
    }));

    it('should have shuffledDeck array with length of 52 ' +
        'and shuffleCount of 52 after shuffleDeck()', async(() => {
        appComponent.ngOnInit();
        appComponent.shuffleDeck();
        expect(appComponent.shuffledDeck.length).toBe(52);
        expect(appComponent.shuffleCount).toBe(52);
    }));

    it('should have randomized shuffledDeck after shuffleDeck()', async(() => {
        appComponent.ngOnInit();
        appComponent.shuffleDeck();
        let arraysAreEqual = true;
        for (let index = 0; arraysAreEqual; index++) {
            arraysAreEqual =
              appComponent.unshuffledDeck[index] === appComponent.shuffledDeck[index];
        }
        expect(arraysAreEqual).toBe(false);
    }));

    it('should have dealtCards be length of number of players ' +
        'when shuffleAndDealCards()', async(() => {
        appComponent.ngOnInit();
        appComponent.numberOfPlayers = 4;
        appComponent.shuffleAndDealCards();
        expect(appComponent.dealtCards.length).toBe(appComponent.numberOfPlayers);
    }));

    it('should have player cards length equal cardsPerPlayer', async(() => {
        appComponent.ngOnInit();
        appComponent.numberOfPlayers = 4;
        appComponent.shuffleAndDealCards();
        expect(appComponent.dealtCards[0].cards.length).toBe(appComponent.cardsPerPlayer);
        expect(appComponent.dealtCards[3].cards.length).toBe(appComponent.cardsPerPlayer);
    }));

    it('should have arrays shuffleCount reset after resetDecks()', async(() => {
        appComponent.ngOnInit();
        appComponent.numberOfPlayers = 3;
        appComponent.shuffleAndDealCards();
        appComponent.resetDecks();
        expect(appComponent.unshuffledDeck.length).toBe(52);
        expect(appComponent.unshuffledDeck[0].hasBeenShuffled).toBe(false);
        expect(appComponent.unshuffledDeck[22].hasBeenShuffled).toBe(false);
        expect(appComponent.shuffledDeck.length).toBe(0);
        expect(appComponent.shuffleCount).toBe(0);
        expect(appComponent.dealtCards.length).toBe(0);
        expect(appComponent.haveDealtCards).toBe(false);
    }));
});
