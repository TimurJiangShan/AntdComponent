function echo<T>(args:T): T {
    return args;
}

const str = echo(true);

/*
* 交换元组的类型
*
* */
function swap<T,U>(truple:[T,U]):[U,T]{
    return [truple[1], truple[0]];
}

const result = swap(['string',123]);
console.log(result);

/*
* 约束泛型
* */

interface IWithLength {
    length: number;
}

/*
* 为了保证T这个类型里面也有length这个属性
* */
function echoWithLength<T extends IWithLength>(args: T): T {
    console.log(args.length);
    return args;
}
const res1 = echoWithLength({ length: 9 });



/*
* 在interface里面定义函数类型，就不能用 => 了，要用冒号 :
*
* */
interface IPlus<T> {
    (a: T, b: T) : T;
}

function plus(a: number, b: number): number {
    return a + b;
}

function connect(a:string, b:string): string {
    return a + b;
}

const a:IPlus<number> = plus;
const b:IPlus<string> = connect;