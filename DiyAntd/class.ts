class Animal {
    readonly name: string;
    constructor(name: string) {
        this.name = name;
    }
    static category: string[] = ['cat','dog'];
    run(){
        return `${this.name} is running`;
    }
}

// const snake = new Animal('Lily');
console.log(Animal.category);

class Dog extends Animal {
    bark(){
        return `${this.name} is barking`;
    }
}

// const dog = new Dog('Tom');
// console.log(dog.bark());
//

/*
* 重写构造函数
* 子类必须加super
* **/

class Cat extends Animal {
    constructor(name) {
        super(name);
        console.log(this.name);
    }
    /*
    * super: 调用父类方法
    * */
    run(){
        return `Meow, ` + super.run();
    }
}

