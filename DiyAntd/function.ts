/**
 * 函数声明
 * function()，参数都是number类型，返回一个number的类型的结果
 * 可选的参数只能放在最后一个位置
 * */

function add(x:number, y:number, z?: number): number {
    if(typeof z === 'number') {
        return x + y + z;
    } else {
        return x + y;
    }
}

// 参数默认值，但是不能加问号了。
function addDefault(x:number, y:number, z: number = 10): number {
    if(typeof z === 'number') {
        return x + y + z;
    } else {
        return x + y;
    }
}

let result = add(1,2,3);

/**
 * 函数表达式
 * => 这个是TS中声明函数返回类型的方法
 * */

const addV2: (x: number, y: number, z: number) => number = addDefault;
const addV3: (x: number, y: number, z: number) => number = addDefault;


/*
*
*
*
* **/