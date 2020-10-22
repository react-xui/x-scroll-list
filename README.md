# x-scroll-list
react list列表横向滚动
# npm 
    npm install --save x-scroll-list
# demo
```
          const { Option } = List;
          //....
          <List onChange={this.onSelectHandle.bind(this)}>
            {
              [{ text: 'demo1' ,value:"ddd"}, { text: 'demo2' ,value:'BBBB'}, { text: 'demo3' }, { text: 'demo4' }, { text: 'demo5' }, { text: 'demo6' }].map((item, index) => <Option key={index} value={item.value}>{item.text}</Option>)
            }
          </List>
          //直接Option的写法
          <List onChange={this.onSelectHandle.bind(this)}>
            <Option value="AAAA">aaa</Option>
            <Option value="BBBB">bbb</Option>
            <Option>ccc</Option>
          </List>
          //传入dataSource
          <List  onChange={this.onSelectHandle.bind(this)} dataSource={[{ text: 'aaaaa' ,value:'AAA'}, { text: 'aabb' ,value:'BBBB'}, { text: 'ccddb' }, { text: 'demo4' }, { text: 'demo5' }, { text: 'demo6' }]}></List>
```
# API
## List
### onChange
onChange返回选中操作时的回调,参数`value,item,index,e`
### dataSource
直接传数组来渲染,如果不指定`dataSource`，以`children`的`Option`来渲染
### field
当传入data时，指定的text和value属性名,默认值如下：
```
{
  text: 'text',
  value: 'value'
}
```
### value
指定value值
### defaultValue
默认选中
### step
每次位移的距离 ，默认20px
## Option
### value
指定value值
### children
指定 text值
### 关于作者
[https://github.com/tianxiangbing](https://github.com/tianxiangbing)

### 组件github地址
[https://github.com/react-xui/x-scroll-list](https://github.com/react-xui/x-scroll-list)


### xui
react xui组件一直在持续更新中，欢迎大家关注[https://github.com/react-xui](https://github.com/react-xui)