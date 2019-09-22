import { Component, h, State, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'sk-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})
export class StockPrice {
  @State() fetchedPrice: number;
  @State() stockInputValue: string;
  @State() stockInputValid = false;
  @State() error: string;

  @Prop({ mutable: true, reflectToAttr: true }) stockSymbolFromOutside: string;

  @Watch('stockSymbolFromOutside')
  stockSymbolChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.fetchStockPrice(newValue);
      this.stockInputValue = newValue;
    }
  }

  onInputHandler(e: Event) {
    this.stockInputValue = (e.target as HTMLInputElement).value;
    this.stockInputValid = this.stockInputValue.trim().length ? true : false;
  }

  onFetchStockPrice(event: Event) {
    event.preventDefault();
    this.stockSymbolFromOutside = this.stockInputValue;
  }

  render() {
    let content = <p>Please enter a symbol!</p>;
    if (this.error) content = <p>{this.error}</p>;
    if (this.fetchedPrice) content = <p>Price: ${this.fetchedPrice}</p>;

    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input type="text" id="stock-symbol" value={this.stockInputValue} onInput={this.onInputHandler.bind(this)} />
        <button type="submit" disabled={!this.stockInputValid}>
          Fetch
        </button>
      </form>,
      <div>{content}</div>
    ];
  }

  fetchStockPrice(stockSymbol: string) {
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=7FI0VOHJAO0OHEUF`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Invalid');
        }
        return res.json();
      })
      .then(parsedRes => {
        if (parsedRes['Error Message']) {
          throw new Error(parsedRes['Error Message']);
        }

        this.fetchedPrice = parsedRes['Global Quote']['05. price'];
        this.error = null;
      })
      .catch(err => (this.error = err.message));
  }

  componentWillLoad() {
    console.log('componentWillLoad');
  }

  componentDidLoad() {
    console.log('componentDidLoad');
    if (this.stockSymbolFromOutside) {
      this.stockInputValue = this.stockSymbolFromOutside;
      this.stockInputValid = true;
      this.fetchStockPrice(this.stockSymbolFromOutside);
    }
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentDidUnload() {
    console.log('componentDidUnload');
  }
}
