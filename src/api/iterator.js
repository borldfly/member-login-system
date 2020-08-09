/**
 * 将如下数组转换为树状结构的对象
 * 如：
 * {
 *    id: 1,
 *    children: [
 *      {
 *          id: 2
 *      },
 *      {
 *          id: 3,
 *          children: [
 *              {xxx}
 *              ...
 *          ]
 *      }
 *    ]
 * } 的格式
 * @type {*[]}
 */
var arr = [
	{id: 1},
	{id: 2,parent: 1},
	{id: 3,parent: 1},
	{id: 4,parent: 3},
	{id: 5,parent: 4}
];
var target = {};
// 对数组进行迭代
arr.forEach(item=>{
	iterator(target,item);
});

function iterator(target,item) {
	// 如果target是对象
	if (Array.isArray(target)){
		target.forEach(tItem=>{
            iterator(tItem,item);
		});
	}else {
        for(let k in item) {
            // 如果item内有parent属性，则先寻找它的父节点
            if('parent' in item ) {
                // 如果当前target中的id跟item的parent值相等，则为对应的父节点
                if(target['id'] === item['parent']) {
                    // 查看target的当前目录下有没有其他子节点
                    if('children' in target) {
                        // 如果有,则把子节点push进去
						if (k === 'parent'){
                            target['children'].push({id: item.id});
						}
                    }else {
                        // 如果没有,则新增一个
						if (k === 'parent'){
                            target['children'] = [{id: item.id}];
						}
                    }
                } else { // 如果不等，就在其子元素里面找
                	if (target.children != undefined){
                        iterator(target.children,item);
                        return;
					}
                }
            } else {
                target[k] = item[k];
            }
        }
	}
}

// console.log(target);