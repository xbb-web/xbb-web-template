# xbb-web-template

> 逍邦web端通用模板

#### 1、启动方式

1.1 安装依赖

```
git clone https://github.com/rossroma/vue-web-template (your-project-name)
cd your-project-name
npm install (npm i / yarn)
npm start / npm run dev / yarn run dev
```

1.2 开发环境启动

```
npm run dev (此时代理地址为)
或
npm run open 192.168.1.45:8080 （此时代理地址为 192.168.1.45:8080）
或
npm run open （此命令=== run dev）
```

1.3 上线打包

```
npm run build
```

#### 2、项目国际化配置

2.1国际化依赖 

```
"vue-i18n": "^7.3.2"
"vue-loader": "^14.2.0"
```

配置vue-loader

```
{
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
    	i18n: '@kazupon/vue-i18n-loader'
	}
}
```

2.2 入口配置（src/lang - 包含全局配置）

```
import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
// import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang

import en from './en'
import zh from './zh'
Vue.use(VueI18n)

const messages = {
  en: {
    ...en
    // ...elementEnLocale
  },
  zh: {
    ...zh
    // ...elementZhLocale
  }
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: 'zh',
  // set locale messages
  messages
})

export default i18n
```

2.3局部配置示例（src/components/HelloWorld）

```
<template>
  <div class="hello-world">
    <div class="lang-check-btn">
      <div class="lang-check-btn-block">
        <div @click="lang = 'zh'" :class="{'select-btn':lang === 'zh'}">中文</div>
        <div @click="lang = 'en'" :class="{'select-btn':lang === 'en'}">英文</div>
      </div>
    </div>
    <h1>{{ $t('HelloWorld.msg') }}</h1>
    <p style="font-size:20px">element-ui 组件的国际化测试</p>
    <el-table
      border
      class="h-w-table"
      :data="tableData">
      <el-table-column
        prop="date"
        :label="$t('HelloWorld.table.tableDate')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        :label="$t('HelloWorld.table.tableName')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        :label="$t('HelloWorld.table.tableAddress')">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { test } from '@/api/test'
export default {
  name: 'HelloWorld',
  data () {
    return {
      tableData: [],
      msg: 'Welcome to Your Vue.js App',
      test: 'test'
    }
  },
  methods: {
  },
  computed: {
    lang: {
      get () {
        return this.$i18n.locale
      },
      set (lang) {
        // 使用单文件i18n时 切记：此处是 ._root.locale
        // this.$i18n.locale = lang
        this.$i18n._root.locale = lang
      }
    }
  },
  created () {
    // this.initLang()
    // axios 测试用
    test({
      'corpid': '1', // 公司id 必传
      'userId': '1', // 用户id 必传
      'platform': '', // 来源 web：pc浏览器；dingtalk：钉钉；all：全部 必传
      'frontDev': 1,

      'appId': '3', // 应用id
      'menuId': '21' // 菜单id 必传
    })
      .then(({ msg }) => {
        console.log(msg)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello-world{
  &>.lang-check-btn{
    display: inline-block;
    width: 100px;
    height: 34px;
    //background: skyblue;
    &>.lang-check-btn-block{
      font-size: 14px;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border: 1px solid #eee;
      border-radius: 4px;
      &>div{
        cursor: pointer;
        flex: 1;
        line-height: 34px;
      }
      &>.select-btn{
        color: #fff;
        height: 100%;
        background: #41b883;
      }
    }
  }
  .h-w-table{
    width: 500px;
    height: 100px;
    margin: 0 auto;
    font-size: 14px;
  }
}
</style>
<i18n>
{
  "zh": {
    "HelloWorld": {
      "msg": "欢迎来到您的Vue.js应用程序",
      "table": {
        "tableDate": "日期",
        "tableName": "姓名",
        "tableAddress": "地址"
      }
    }
  },
  "en": {
    "HelloWorld": {
      "msg": "Welcome to Your Vue.js App",
      "table": {
        "tableDate": "date",
        "tableName": "name",
        "tableAddress": "address"
      }
    }
  }
}
</i18n>


```

<u>！注意事项</u>

```
computed: {
    lang: {
        get () {
        	return this.$i18n.locale
        },
        set (lang) {
            // 使用单文件i18n时 切记：此处是 ._root.locale
            // this.$i18n.locale = lang
            this.$i18n._root.locale = lang
        }
    }
}
```



#### 3、element-ui 按需引入

3.1按需引入依赖（[babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)）

```
npm install babel-plugin-component -D
```

然后，将 .babelrc 修改为：

```
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

具体引入配置参考（src/element-ui/index.js）