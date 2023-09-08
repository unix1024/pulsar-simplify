class WorkspaceElement extends HTMLElement{
  constructor() {
    super();
  }

  connectedCallback() {
    console.log('Element connected');
  }
 
  disconnectedCallback() {
    console.log('Element disconnected');
  }

  initializeContent(){
    this.classList.add('workspace');
    this.setAttribute('tabindex', -1);

    this.verticalAxis = document.createElement('atom-workspace-axis');
    this.verticalAxis.classList.add('vertical');

    this.horizontalAxis = document.createElement('atom-workspace-axis');
    this.horizontalAxis.classList.add('horizontal');
    this.horizontalAxis.appendChild(this.verticalAxis);

    this.appendChild(this.horizontalAxis);
  }

  // 利用model，进行Dom节点的布局，生成DOM
  initialize(model){
    this.model = model;
    this.initializeContent();

    this.paneContainer = this.model.getCenter().paneContainer.getElement();
    this.verticalAxis.appendChild(this.paneContainer);

    this.panelContainers = {
      top: this.model.panelContainers.top.getElement(),
      left: this.model.panelContainers.left.getElement(),
      right: this.model.panelContainers.right.getElement(),
      bottom: this.model.panelContainers.bottom.getElement(),
      header: this.model.panelContainers.header.getElement(),
      footer: this.model.panelContainers.footer.getElement()
    };
    
    this.horizontalAxis.insertBefore(
      this.panelContainers.left,
      this.verticalAxis
    );
    this.horizontalAxis.appendChild(this.panelContainers.right);
    
    this.verticalAxis.insertBefore(
      this.panelContainers.top,
      this.paneContainer
    );
    this.verticalAxis.appendChild(this.panelContainers.bottom);
    
    this.insertBefore(this.panelContainers.header, this.horizontalAxis);
    this.appendChild(this.panelContainers.footer);

    return this;
  }

}

window.customElements.define('atom-workspace', WorkspaceElement);

function createWorkspaceElement() {
  return document.createElement('atom-workspace');
}
 
module.exports = {
  createWorkspaceElement
};
