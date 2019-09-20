import { Component, h, Prop, Method } from '@stencil/core';

@Component({
  tag: 'sk-side-drawer',
  styleUrl: 'side-drawer.css',
  shadow: true
})
export class MyComponent {
  @Prop({ reflectToAttr: true }) title: string;
  @Prop({ reflectToAttr: true, mutable: true }) opened: boolean;

  onClose() {
    this.opened = false;
  }

  @Method()
  open() {
    this.opened = true;
  }

  render() {
    return [
      <div id="backdrop" onClick={this.onClose.bind(this)}></div>,
      <aside>
        <header>
          <h1>{this.title}</h1>
          <button onClick={this.onClose.bind(this)}>X</button>
        </header>
        <main>
          <slot></slot>
        </main>
      </aside>
    ];
  }
}
