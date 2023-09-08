const {Disposable} = require('event-kit')

class User{
  constructor(){

  }

  create(){
    return new Disposable(() => {
      this.remove();
    });
  }

  remove(){
    console.log(111);
  }
}

var user = new User();
var dis = user.create();

dis.dispose();