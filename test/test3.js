class MyElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = 'Hello World!';
    console.log('Element connected');
  }

  disconnectedCallback() {
    console.log('Element disconnected');
  }

  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
  }
}

customElements.define('my-element', MyElement);
