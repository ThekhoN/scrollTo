class DoSomething {
  constructor(options){
    if(!options){
      options = {};
    }
    this.name = options.name? options.name: 'Jack';
    this.saying = options.saying? options.saying: 'hello';
    this.doing = options.doing? options.doing: 'work';
  }

  saying_something(){
    console.log(this.name + ' is saying ' +  this.saying);
  }

  doing_something(){
    console.log(this.name + ' is doing ' + this.doing);
  }
}

module.exports = DoSomething;
