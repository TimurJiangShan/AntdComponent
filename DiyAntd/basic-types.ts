let isDone: boolean = false;
let num: number = undefined;

// 联合类型
let numberOrString: number | string = 234; // 既可以是number，也可以是string
numberOrString = '';

// Array 和 triple
let arrayOfNumbers:number[] = [1,2,3,4,5]; // 定义number数组

function test(){
    // Array Like Objects. 这个argument就是一种类数组。
    console.log(arguments);
}

// 元组, 元组就是限定了每一项的类型的数组
let user:[string, number] = ['Jiangshan',1];

// Interface 接口
/**
 * 1. 对对象的形状进行描述
 * 2. 对类进行抽象
 * */

interface Person {
    readonly id: number;
    name: string;
    age?: number;
}

let jiangshan:Person = {
    id: 123456,
    name: "Jiangshan",
}

// 只读属性。只能在创建的时候被赋值. readonly用在属性上面，const用在变量上面

