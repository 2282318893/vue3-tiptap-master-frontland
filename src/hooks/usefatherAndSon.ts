//我的每个菜单的类型
class menuItem {
    title: string
    children?: menuItem[]
    type: number   //type为1表示是h1标签
    index: number    //index表示是type对应的第几个h标签
    constructor(
      title: string,
      type: number,
      index: number,
      children: menuItem[] = []
    ) {
      this.title = title
      this.children = children
      this.type = type
      this.index = index
    }
  }
  export default function (menu: any[]): any[] {
    //保存所有h min标签
    const arr: menuItem[] = []
    const arrIndex: number[] = new Array(7).fill(0)
    // 用于保存前一个层的结点。例如我当前遍历的是type=3的item，那么我需要知道它所属于哪个type=2的item
    // 如果有就添加到它的children中，如果没有就添加到pre[3]中
    const pre = new Array(7).fill(null)
    //记录h min是哪个标签（例如h1）
    let minType
    for (const item of menu) {
      const content = item[0]
      const type = parseInt(content[2])
      //const title = content.split(/<\/?h.>/)[1]
      const title = extractTextFromHTag(content)
      const menuitem = new menuItem(title, type, arrIndex[type]++)
  
      //判断当前type-1项有没有内容，有的话就加入到前一个种类的children中去
      if (pre[type - 1]) {
        pre[type - 1].children.push(menuitem)
      }
      //重置当前type的项
      pre[type] = menuitem
      minType = minType ?? type
      //如果是最小的h标签，就插入
      if (type === minType) {
        arr.push(menuitem)
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