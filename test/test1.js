const {Emitter, CompositeDisposable} = require('event-kit')

class User {
  constructor() {
    this.emitter = new Emitter()
  }

  onDidChangeName(callback) {
    return this.emitter.on('did-change-name', callback)
  }

  setName(name) {
    if (name !== this.name) {
      this.name = name
      this.emitter.emit('did-change-name', name)
    }

    return this.name
  }

  destroy() {
    this.emitter.dispose()
  }
}

const subscriptions = new CompositeDisposable()

var user = new User();
var sub1 = user.onDidChangeName((name) => {
  console.log(name);
})
subscriptions.add(sub1);

user.setName("wc");
subscriptions.dispose();
user.setName("ccc");