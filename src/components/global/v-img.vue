/*
 * @Author: kai.yang
 * @Date: 2018-08-21 14:04:53
 * @LastEditors: kai.yang
 * @LastEditTime: 2018-08-21 15:23:50
 * @Description: 图片组件
 */

<template>
  <div v-if="value" class="img-wrap">
    <img :src="value" class="v-img" @load="autoResizeImage($event)" :style="imgStyle">
  </div>
</template>

<script>

export default {
  name: 'VImg',

  props: {
    value: {
      type: String
    }
  },

  data () {
    return {
      imgStyle: {}
    }
  },

  methods: {
    // 图片尺寸自适应
    autoResizeImage (event, type) {
      const img = event.target || (event.path && event.path[0])
      // 获取图片的原始宽高
      const {naturalWidth, naturalHeight} = img
      // 获取图片宽高比
      const imgRatio = naturalWidth / naturalHeight

      const parent = (event.target && event.target.parentNode) || (event.path && event.path[1])
      // 获取图片父div的宽高
      const {offsetWidth, offsetHeight} = parent
      // 获取图片父div的宽高比
      const parentRatio = offsetWidth / offsetHeight

      // 当图片的宽高比大于父div的宽高比时，以父div的高为图片的高，宽为 'auto'
      if (imgRatio > parentRatio) {
        // 该图片距离左侧的margin值
        const marginLeft = ((naturalWidth / (naturalHeight / offsetHeight)) - offsetWidth) / 2
        this.imgStyle = {
          height: offsetHeight + 'px',
          width: 'auto',
          marginLeft: -marginLeft + 'px'
        }
        // 当图片的宽高比不大于父div的宽高比时，以父div的宽为图片的宽，高为 'auto'
      } else {
        // 该图片距离顶部的margin值
        const marginTop = (naturalHeight / (naturalWidth / offsetWidth) - offsetHeight) / 2
        this.imgStyle = {
          height: 'auto',
          width: offsetWidth + 'px',
          marginTop: -marginTop + 'px'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .img-icon {
    position: relative;
    height: 100%;
    background-color: #f5f5f5;
    .iconfont {
      font-size: 7em;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #cccccc;
    }
  }
  .img-wrap {
    width: 100%;
    height: 100%;
    display: inline-block;
    overflow: hidden;
    .v-img {
      height: 10px;
      width: 10px;
      background-color: #ddd;
    }
  }
</style>
