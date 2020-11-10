function echo<T>(args:T): T {
    return args;
}

function echo1<T>(args: T): T{
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

function swap2<T,U>(triple:[T,U]):[U,T]{
    return [triple[1], triple[0]];
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

interface IMultiple<T> {
    (a: T, b: T) : T;
}

interface IDivide<T>{
    (a: T, b: T) : T;
}

function plus(a: number, b: number): number {
    return a + b;
}

function connect(a:string, b:string): string {
    return a + b;
}

function multiple(a: number, b: number): number{
    return a * b;
}

function stringMulti(a: string, b: string): string{
    return `${a} * ${b}`;
}

console.log('--------------------------------');

const a:IPlus<number> = plus;
const b:IPlus<string> = connect;

const c:IMultiple<number> = multiple;
const d:IMultiple<string> = stringMulti;

console.log(a(1,1));
console.log(b("LOVE","LOVE"));
console.log(c(2,2));
console.log(d("Cloud", "Cloud"));


// type aliases
// 联合类型
type NameResolver = () => string;
type NameOrResolver = string | NameResolver | number;

function getName(n: NameOrResolver): string{
    if(typeof n === 'string')
        return n;
    else if(typeof  n === 'number')
        return `${n}`;
    else
        return n();
}

// Type assertion
// 联合类型里面共有的属性(只能断言成联合类型里面有的类型)
function getLength(input: string | number): number{
    if((<string>input).length) {
        return (<string>input).length;
    } else {
        return <number>input;
    }

}




