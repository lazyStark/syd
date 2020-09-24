<template>
  <div id="time" class="time-wrapper clearfix" @click.capture.prevent="time" @mousemove.capture.stop="showTip" @mouseleave.capture.stop="hiddenTip">
    <div id="progress" class="time-progress">
      <div class="hover-tip">
        <!-- <div class="hover-arrow" /> -->
        <span class="tip-val">{{ timeHover }}</span>
      </div>
      <div class="line-tip">
        <!-- <div class="tip-arrow" /> -->
        <span class="tip-val">{{ timeClick }}</span>
      </div>
      <p class="time-now" />
    </div>
    <div class="time-line">
      <div class="line-left" />
      <ol class="line-right">
        <li v-for="(item, index) in 6" :key="index" class="fl time-cell-box time-line-box">
          <p v-for="(_item, _index) in 8" :key="_index" class="line-item fl" />
        </li>
      </ol>
    </div>
    <div class="time-bottom">
      <div class="time-left">
        <div v-show="play" class="left-play" />
        <div v-show="!play" class="left-stop">▐▐</div>
      </div>
      <ol class="time-right">
        <li v-for="(item, index) in week" :key="index" class="fl time-cell-box">
          <ol class="time-val">
            <li v-for="(_item, _index) in 8 " :key="_index" class="fl val-item">
              <template v-if="_index !==0">
                {{ formateDay(_index) }}
              </template>
            </li>
          </ol>
          <div class="time-day">
            <span>{{ item.day }}</span> <span>{{ item.week }}</span>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
import elementResizeDetector from 'element-resize-detector'
import { parseTime, dateAdd, numAdd } from '@/utils'
export default {
  name: 'TimeLine',
  props: {
    width: {
      type: String,
      default: () => '100%'
    }
  },
  data() {
    return {
      play: true,
      nowTime: new Date(),
      week: this.initTime(),
      timeClick: '',
      timeHover: '',
      timeFinally: '',
      timer: null,
      hour: 0
    }
  },
  mounted() {
    document.getElementById('time').style.width = this.width;
    // 6 天
    Array.from(document.getElementsByClassName('time-cell-box')).map(v => { v.style.width = `${100 / 6}%` })
    // 3 * 8 = 24小时
    Array.from(document.getElementsByClassName('line-item')).map(v => { v.style.width = `${100 / 8}%`; v.style.height = '8px'; })
    // 缩放重置
    const erd = elementResizeDetector();
    const that = this;
    erd.listenTo(document.getElementById("time"), function(e) {
      that.$nextTick(() => {
        that.timeToWidth()
      })
    })
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer)
    this.timer = null;
  },
  methods: {
    /**
     * @author: siwenfeng
     * @description: 播放背景控制
     * @name:
     * @param {type}
     * @return {type}
     */
    playControl() {
      this.play = !this.play;
      if (!this.play) {
        // 获取tooltip
        const lineTip = document.getElementsByClassName('line-tip')[0];
        // 获取时间轴
        const progress = document.getElementById('progress');
        const item = document.getElementsByClassName('time-right')[0];
        const itemW = item.clientWidth
        const cell = item.clientWidth / (6 * 8 * 3);
        this.timer = setInterval(() => {
          if (progress.clientWidth - 40 + cell >= itemW) {
            progress.style.width = 0 + 'px'
            lineTip.style.left = 10 + 'px';
            this.hour = 0;
          } else {
            progress.style.width = numAdd(progress.clientWidth, cell) + 'px'
            lineTip.style.left = lineTip.offsetLeft + cell + 'px';
            this.hour = (this.hour + 1) % 24
          }
          this.timeClick = this.formateClickTime(this.hour)
          const dayNum = Math.floor((progress.clientWidth - 40) / (itemW / 6))
          this.timeFinally = this.week[dayNum].day + this.timeClick
        }, 1000)
      } else {
        this.timer && clearInterval(this.timer)
      }
    },
    /**
     * @author: siwenfeng
     * @description:时间轴点击显示时间
     * @name:
     * @param {type}
     * @return {type}
     */
    time(e) {
      console.log(e)
      // 阻止了事件捕获，委托给父元素，判断是否按下播放或者暂停
      if (e.target.className === 'line-left') {
        this.playControl();
      } else {
        const lineTip = document.getElementsByClassName('line-tip')[0];
        const item = document.getElementsByClassName('time-right')[0];
        const itemW = item.clientWidth / 6
        const cell = item.clientWidth / (6 * 8 * 3);
        const progress = document.getElementById('progress');
        const left = progress.getBoundingClientRect().left;
        const w = e.clientX - left;
        const lineW = w - 40 > 0 ? (w - 40) : 0
        const width = w + 'px';
        lineTip.style.display = 'block';
        lineTip.style.left = (lineW + 10) + 'px';
        progress.style.width = width

        this.hour = Math.floor((lineW % itemW) / cell)
        this.timeClick = this.formateClickTime(this.hour)
        const dayNum = Math.floor(lineW / itemW)
        this.timeFinally = this.week[dayNum].day + this.timeClick
        if (this.timer) {
          clearInterval(this.timer)
          this.play = true;
          this.playControl()
        }
      }
    },
    /**
     * @author: siwenfeng
     * @description:格式化时间03 06 09
     * @name:
     * @param {type}
     * @return {type}
     */
    formateDay(_index) {
      return 3 * _index < 10 ? `0${3 * _index}` : 3 * _index
    },
    /**
     * @author: siwenfeng
     * @description:将数字转成整点时间
     * @name:
     * @param {type}
     * @return {type}
     */
    formateClickTime(num) {
      return num < 10 ? `0${num}:00` : `${num}:00`
    },
    /**
     * @author: siwenfeng
     * @description:将当前时间转成px宽度
     * @name:
     * @param {type}
     * @return {type}
     */
    timeToWidth() {
      this.hour = new Date().getHours();
      const nowDom = document.getElementsByClassName('time-now')[0];
      const progress = document.getElementById('progress');
      const lineTip = document.getElementsByClassName('line-tip')[0];
      const item = document.getElementsByClassName('time-right')[0];
      const itemW = item.clientWidth / 6
      const cell = item.clientWidth / (6 * 8 * 3);
      const w = numAdd(itemW, this.hour * cell);
      // 加上左侧宽度
      progress.style.width = (w + 40) + 'px';
      nowDom.style.left = (w + 40 - 7) + 'px';
      nowDom.style.display = 'block';
      lineTip.style.display = 'block';
      // tip的border宽度是10px
      lineTip.style.left = (w + 10) + 'px';
      this.timeClick = this.formateClickTime(this.hour)
    },
    /**
     * @author: siwenfeng
     * @description:初始化星期和天，默认显示6天时间
     * @name:
     * @param {type}
     * @return {type}
     */
    initTime() {
      const nowTime = new Date();
      const arr = []
      for (let i = -1; i < 5; i++) {
        const obj = {}
        obj.day = parseTime(dateAdd(nowTime, 'd', i), '{m}/{d}')
        obj.week = `(周${parseTime(dateAdd(nowTime, 'd', i), '{a}')})`
        arr.push(obj)
      }
      return arr;
    },
    /**
     * @author: siwenfeng
     * @description:鼠标悬停显示时间轴时间
     * @name:
     * @param {type}
     * @return {type}
     */
    showTip(e) {
      const item = document.getElementsByClassName('time-right')[0];
      const itemW = item.clientWidth / 6
      const cell = item.clientWidth / (6 * 8 * 3);
      const hoverTip = document.getElementsByClassName('hover-tip')[0];
      const progress = document.getElementById('progress');
      const left = progress.getBoundingClientRect().left;
      const w = e.clientX - left;
      const lineW = w - 40 > 0 ? (w - 40) : 0
      const timeHover = Math.floor(((lineW) % itemW) / cell)
      this.timeHover = this.formateClickTime(timeHover)
      hoverTip.style.display = 'block';
      hoverTip.style.left = (lineW + 10) + 'px';
    },
    hiddenTip() {
      const hoverTip = document.getElementsByClassName('hover-tip')[0];
      hoverTip.style.display = 'none';
    }
  }
}
</script>

<style>
.time-wrapper {
  position: relative;
  margin-top: 200px;
  box-sizing: border-box;
  cursor: pointer;
}
.time-line {
  height: 8px;
  width: 100%;
  background: #ddd;
}
.time-bottom {
  width: 100%;
  height: 46px;
}
.time-progress {
  background: #e55c5c;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 40px;
  transition:  width .5s ease;
  height: 8px;
}
.time-left {
  float: left;
  width: 40px;
  height: 46px;
  background: rgba(117,121,143,.8);
  border-right: 1px solid #fff;
  padding: 5px 10px;
}
.time-right {
  float: left;
  width: calc(100% - 40px);
  height: 46px;
  background: rgba(117,121,143,.8);
}
.line-left {
  float: left;
  width: 40px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-right: 1px solid #fff;
}
.line-right {
  float: left;
  width: calc(100% - 40px);
  height: 8px;
  position: absolute;
  top: 0;
  left: 40px;
}
.left-play {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-left: 20px solid #fff;
  border-bottom: 10px solid transparent;
  background: transparent;
  cursor: pointer;
  margin-top: 6px;
}
.left-stop {
  color: #fff;
  margin-top: 8px;
  font-size: 14px;
  margin-left: -4px;
}
.time-cell-box {
  height: 100%;
  text-align: center;
  line-height: 46px;
  border-right: 1px solid #fff;
}
.line-item {
  border-right: 1px solid #fff;
}
.time-cell-box .line-item:last-child {
  border-right: none;
}
.time-line-box {
  border-right: none;
}
.time-line-box .line-item:last-child {
  border-right: 1px solid #fff;
}
.time-val {
  height: 14px;
  width: 100%;
  border-bottom: .5px solid hsla(0,0%,71%,.4);
}
.val-item {
  height: 14px;
  text-align: center;
  color: #fff;
  opacity: .7;
  width: 12.4%;
  line-height: 14px;
  font-size: 10px;
}
.time-day {
  height: 30px;
  color: #fff;
  font-size: 14px;
  line-height: 30px;
}
.time-val .val-item:first-child {
  width: 6.5%;
}
.hover-tip, .line-tip {
  padding: 4px 8px;
  height: 26px;
  position: absolute;
  bottom: 18px;
  background: rgba(0,0,0,.3);
  color: #fff;
  z-index: 1002;
  display: none;
  border-radius: 4px;
  transition: left .4s ease;
  /* 禁用tip点击 */
  pointer-events: none;
}
.hover-tip {
  background: #009845;
  /* left: 100px; */
}
.hover-tip::after, .line-tip::after {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  margin-left: -10px;
  left: 50%;
  top: 26px;
  border: 10px solid transparent;
  border-top-color: #009845;
}
.line-tip::after {
  border-top-color: rgba(0,0,0,.3);
}
.time-now {
  display: none;
  width: 7px;
  height: 8px;
  position: absolute;
  top: 0;
  /* left: 200px; */
  background: #a8cb09;
}
</style>
