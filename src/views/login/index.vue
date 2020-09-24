<!--
 * @Author: siwenfeng
 * @Date: 2020-07-02 14:49:59
 * @LastEditTime: 2020-09-14 17:17:17
 * @Description: this is ....
-->
<template>
  <div class="login-container">
    <div class="login-weaper animated bounceInDown">
      <div class="login-left">
        <div class="login-time">{{ time }}</div>
        <img class="img" src="../../assets/img/logo.png" alt>
        <p class="title">水生态环境管理系统</p>
      </div>
      <div class="login-border">
        <div class="login-main">
          <h4 class="login-title">
            水生态环境管理系统{{ '' }}
          </h4>
          <userLogin />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userLogin from './userlogin'
import { parseTime } from '@/utils'
export default {
  name: 'Login',
  components: {
    userLogin
  },
  data() {
    return {
      time: ''
    }
  },
  created() {
    this.getTime()
    setInterval(() => {
      this.getTime()
    }, 1000)
  },
  methods: {
    getTime() {
      this.time = parseTime(new Date())
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: url("http://www.17sucai.com/preview/242158/2015-01-10/%E7%99%BB%E5%BD%95/images/cloud.jpg")
    0 bottom repeat-x #049ec4;
  animation: animate-cloud 20s linear infinite;
}
.login-weaper {
  margin: 0 auto;
  width: 1000px;
  box-shadow: -4px 5px 10px rgba(0, 0, 0, 0.4);
  .el-input-group__append {
    border: none;
  }
}

.login-left,
.login-border {
  position: relative;
  min-height: 500px;
  align-items: center;
  display: flex;
}
.login-left {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  justify-content: center;
  flex-direction: column;
  background-color: #409EFF;
  color: #fff;
  float: left;
  width: 50%;
  position: relative;
}
.login-left .img {
  width: 140px;
}
.login-time {
  position: absolute;
  left: 25px;
  top: 25px;
  width: 100%;
  color: #fff;
  font-weight: 200;
  opacity: 0.9;
  font-size: 18px;
  overflow: hidden;
}
.login-left .title {
  margin-top: 60px;
  text-align: center;
  color: #fff;
  font-weight: 300;
  letter-spacing: 2px;
  font-size: 25px;
}

.login-border {
  border-left: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: #fff;
  background-color: #fff;
  width: 50%;
  float: left;
  box-sizing: border-box;
}
.login-main {
  margin: 0 auto;
  width: 65%;
  box-sizing: border-box;
}
.login-main > h3 {
  margin-bottom: 20px;
}
.login-main > p {
  color: #76838f;
}
.login-title {
  color: #333;
  margin-bottom: 40px;
  font-weight: 500;
  font-size: 22px;
  text-align: center;
  letter-spacing: 4px;
}
.login-menu {
  margin-top: 40px;
  width: 100%;
  text-align: center;
  a {
    color: #999;
    font-size: 12px;
    margin: 0px 8px;
  }
}
</style>
