import sha256 from 'sha256'
// import * as api from 'src/api'
import { Message } from 'element-ui'
import { getSignature } from '@/api/common'
// 上传组件的公共部分
export default {
  data () {
    return {
      imgAccept: 'image/*', // 允许上传的图片格式
      uploadUlr: '', // el-upload组件action 的参数
      uploadData: {}, // el-upload组件data 的参数
      signature: {}, // 从服务端取回的签名信息
      fileUrl: {}, // 上传成功后的文件地址
      uploadProgress: {}, // 上传时的进度
      uploadError: false, // 文件上传出错
      uploadFile: [], // 上传文件文件列表
      uploadImg: [], // 上传文件图片列表
      expire: Date.parse(new Date()) / 1000
    }
  },

  methods: {
    get_signature (cb) {
      // const url = '/aliyun/oss/getSignature.do'
      getSignature({}).then((data) => {
        this.expire = Date.parse(new Date()) / 1000
        this.signature = data.result
        const uploadParams = {
          'key': '',
          'policy': this.signature['policy'],
          'OSSAccessKeyId': this.signature['accessid'],
          'success_action_status': '200', // 让服务端返回200,不然，默认会返回204
          'signature': this.signature['signature']
        }
        this.uploadData = uploadParams
        this.uploadUlr = this.signature['host']
      })
    },

    set_upload_param () {
      // 签名的有效期为2分钟，二分钟后重新获取签名
      const now = Date.parse(new Date()) / 1000
      if (this.expire + 120 < now) {
        this.get_signature()
        return true
      } else if (!this.signature['signature']) {
        this.get_signature()
        return true
      }
      return false
    },

    // 上传前校验
    handleBeforeUpload (file) {
      const reg = /,|&|@|\[|\]/
      const imgTypes = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'image']
      const type = file.name.replace(/.+\./, '').toLowerCase()
      if (imgTypes.indexOf(type) === -1) {
        Message({
          type: 'error',
          message: '所上传的图片文件格式有误，请重新选择！'
        })
        return false
      } else if (file.size > 20000000) {
        Message({
          type: 'error',
          message: '所上传的文件过大，请重新选择或压缩后上传！'
        })
        return false
      } else if (reg.test(file.name)) {
        Message({
          type: 'error',
          message: `所上传的文件名中含有','、'&'、'@'、'['、']' 等特殊字符，请重新选择或命名后上传！`
        })
        return false
      } else if (this.signature) {
        // const corpid = this.$cookies.get('corpid') || ''
        const corpid = 1
        const fileName = sha256(file.name + file.size)
        const ext = file.name.replace(/.+\./, '').toLowerCase()
        this.uploadData.key = `${this.signature['dir']}/${corpid}/${ext}/${fileName}.${ext}`

        // 拼接上传文件地址
        this.$set(this.fileUrl, file.uid, this.signature.viewurl + this.uploadData.key)
        return true
      } else {
        Message({
          type: 'warning',
          message: '签名获取失败，请重新上传'
        })
        return false
      }
    },
    handleBeforeFileUpload (file) {
      const reg = /,|&|@|\[|\]/
      // const imgTypes = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'image']
      // const type = file.name.replace(/.+\./, '').toLowerCase()
      // if (imgTypes.indexOf(type) === -1) {
      //   Message({
      //     type: 'error',
      //     message: '所上传的图片文件格式有误，请重新选择！'
      //   })
      //   return false
      // } else
      if (file.size > 20000000) {
        Message({
          type: 'error',
          message: '所上传的文件过大，请重新选择或压缩后上传！'
        })
        return false
      } else if (reg.test(file.name)) {
        Message({
          type: 'error',
          message: `所上传的文件名中含有','、'&'、'@'、'['、']' 等特殊字符，请重新选择或命名后上传！`
        })
        return false
      } else if (this.signature) {
        // const corpid = this.$cookies.get('corpid') || ''
        const corpid = 1
        const fileName = sha256(file.name + file.size)
        const ext = file.name.replace(/.+\./, '').toLowerCase()
        this.uploadData.key = `${this.signature['dir']}/${corpid}/${ext}/${fileName}.${ext}`

        // 拼接上传文件地址
        this.$set(this.fileUrl, file.uid, this.signature.viewurl + this.uploadData.key)
        return true
      } else {
        Message({
          type: 'warning',
          message: '签名获取失败，请重新上传'
        })
        return false
      }
    },
    fileUploadLimitHook () { // 文件上传数量限制提示
      Message({
        type: 'error',
        message: '上传数量超出限制！'
      })
    },

    // 监听上传失败
    handleError () {
      Message({
        type: 'error',
        message: '上传失败'
      })
    }
  }
}
