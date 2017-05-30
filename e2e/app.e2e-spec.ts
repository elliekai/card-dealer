import { CardDealerPage } from './app.po';

describe('card-dealer App', () => {
  let page: CardDealerPage;

  beforeEach(() => {
    page = new CardDealerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
