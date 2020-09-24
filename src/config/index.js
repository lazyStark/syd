let baseUrl = ''
const iconfontVersion = ['2061418_8w46stm1mek']
const iconfontUrl = `//at.alicdn.com/t/font_$key.css`
const codeUrl = `${baseUrl}/code`
const env = process.env
if (env.NODE_ENV === 'development') {
  baseUrl = `` // 开发环境地址
} else if (env.NODE_ENV === 'production') {
  baseUrl = `` // 生产环境地址
} else if (env.NODE_ENV === 'test') {
  baseUrl = `` // 测试环境地址
}
export {
  baseUrl,
  iconfontUrl,
  iconfontVersion,
  codeUrl,
  env
}
