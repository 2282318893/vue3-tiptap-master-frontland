//我的每个菜单的类型
class menuItem {  
    id: string  //标签对应id
    title: string
    children?: menuItem[]
    type: number   //type为1表示是h1标签
    constructor(
      id: string,
      title: string,
      type: number,
      children: menuItem[] = []
    ) {
      this.id = id
      this.title = title
      this.children = children
      this.type = type
    }
  }
  // export default function (menu: any[]): any[] {
  //   //保存所有h min标签
  //   const arr: menuItem[] = []
  //   const arrIndex: number[] = new Array(7).fill(0)
  //   // 用于保存前一个层的结点。例如我当前遍历的是type=3的item，那么我需要知道它所属于哪个type=2的item
  //   // 如果有就添加到它的children中，如果没有就添加到pre[3]中
  //   const pre = new Array(7).fill(null)
  //   //记录h min是哪个标签（例如h1）
  //   let minType
  //   for (const item of menu) {
  //     //获取id
  //     // console.log(item[0])
  //     const quotationIndex1 = item[0].indexOf('\"')
  //     const quotationIndex2 = item[0].indexOf('\"', quotationIndex1 + 1)
  //     const id = item[0].substring(quotationIndex1 + 1, quotationIndex2)
  //     const content = item[0]
  //     const type = parseInt(content[2])
  //     //const title = content.split(/<\/?h.>/)[1]
  //     const title = extractTextFromHTag(content)
  //     const menuitem = new menuItem(id, title, type, arrIndex[type]++)
  
  //     //判断当前type-1项有没有内容，有的话就加入到前一个种类的children中去
  //     if (pre[type - 1]) {
  //       pre[type - 1].children.push(menuitem)
  //     }
  //     //重置当前type的项
  //     pre[type] = menuitem
  //     minType = minType ?? type
  //     //如果是最小的h标签，就插入
  //     if (type === minType) {
  //       arr.push(menuitem)
  //     }
  //   }
  //   return arr
  // }

export default function (menu: any[]): any[] {
  const arr: menuItem[] = []
  const tempArr: menuItem[] = []
  for (const item of menu) {
    //获取id
    // console.log(item[0])
    const quotationIndex1 = item[0].indexOf('\"')
    const quotationIndex2 = item[0].indexOf('\"', quotationIndex1 + 1)
    const id = item[0].substring(quotationIndex1 + 1, quotationIndex2)
    const content = item[0]
    const type = parseInt(content[2])
    //const title = content.split(/<\/?h.>/)[1]
    const title = extractTextFromHTag(content)
    const menuitem = new menuItem(id, title, type)
    tempArr.push(menuitem)
  }
  //将生成的转化为层级结构
  for (let i = 0; i < tempArr.length; i++) {
    const curNode = tempArr[i]
    const type = curNode.type
    let index = -1;
    for(let j = i - 1; j >= 0; j--){
      //找到第一个type小于当前节点的节点，即为当前节点的父节点，加入其chiledren中
      if(tempArr[j].type < type){
        index = j;
        curNode.title = '---'.repeat(type - tempArr[index].type - 1) + curNode.title
        tempArr[j].children.push(curNode)
        break;
      }
    }
    if(index === -1){
      //没有找到父节点,即当前节点为根节点
      if(type != 1){
        // 不是h1标签，但是没有h1标签作为父节点，在title前加上空格
        curNode.title = '  '.repeat(type - 1) + curNode.title
      }
      //插入arr数组中
      arr.push(curNode)
    }
  }
  return arr
}
  
  function extractTextFromHTag(html: string): string {
    // 提取h1标签中的内容，包括嵌套的HTML标签
    const hTagPattern = /<h[1-6][^>]*>(.*?)<\/h[1-6]>/i;
    const match = html.match(hTagPattern);
    if (match && match[1]) {
      const innerContent = match[1];
      // 去掉内部的HTML标签
      const textContent = innerContent.replace(/<[^>]*>/g, '');
      return textContent;
    }
    return '';
  }