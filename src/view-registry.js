module.exports = class ViewRegistry {
  constructor(atomEnvironment) {
    this.atomEnvironment = atomEnvironment;
    this.clear();
  }

  clear() {
    this.views = new WeakMap();
    this.providers = [];
  }

  getView(object) {
    if (object == null) {
      return;
    }

    let view = this.views.get(object);
    if (!view) {
      view = this.createView(object);
      this.views.set(object, view);
    }
    return view;
  }

  createView(object) {
    if (object instanceof HTMLElement) {
      return object;
    }

    let element;
    if (object && typeof object.getElement === 'function') {
      element = object.getElement();
      if (element instanceof HTMLElement) {
        return element;
      }
    }
  }

}