# uniapp集成字节小程序提供的插件库

## 环境

uniapp + vite2 + mp-toutiao

## 使用

```ts
plugins: [
    ...
    UniappToGroup({
      // 对应 package.json 中引入插件步骤
      package: {
        ttPlugins: {
          dependencies: {
            'plugin': {
              version: 'version',
              isDynamic: true
            }
          }
        }
      },
      app: {
        pages: [
          'ext://plugin/xxx',
          xxx
        ],
        fallbackPluginPages: {
          // 这里的 key 是小程序原来的商品详情页（下面只是示意），value 可以就用这个值
          // 'product/detail/index': 'ext://poi-group-buy-plugin/detail'
        }
      }
    })
  ],
```
## 说明

第一版
