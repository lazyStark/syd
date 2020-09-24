/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable no-extend-native */
/**
 * Created by wangxx on 2020/01/08.
 * 时间格式化工具类
 **/
const weekDay = [
  ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
];
/**
 * @fun 计算日期
 * @param strInterval {String} (s:秒, n:分,h:小时,D:天,W:星期,Q:季,M:月,Y:年);
 * @param Number {Number}（正数: 加，负数:减）;
 **/

Date.prototype.dateAdd = function(strInterval, Number) {
  // debugger
  const dtTmp = this;
  switch (strInterval) {
    case 's':
      return new Date(Date.parse(dtTmp) + 1000 * Number);
    case 'n':
      return new Date(Date.parse(dtTmp) + 60000 * Number);
    case 'h':
      return new Date(Date.parse(dtTmp) + 3600000 * Number);
    case 'd':
      return new Date(Date.parse(dtTmp) + 86400000 * Number);
    case 'w':
      return new Date(Date.parse(dtTmp) + 86400000 * 7 * Number);
    case 'q':
      return new Date(
        dtTmp.getFullYear(),
        dtTmp.getMonth() + Number * 3,
        dtTmp.getDate(),
        dtTmp.getHours(),
        dtTmp.getMinutes(),
        dtTmp.getSeconds()
      );
    case 'm':
      return new Date(
        dtTmp.getFullYear(),
        dtTmp.getMonth() + Number,
        dtTmp.getDate(),
        dtTmp.getHours(),
        dtTmp.getMinutes(),
        dtTmp.getSeconds()
      );
    case 'y':
      return new Date(
        dtTmp.getFullYear() + Number,
        dtTmp.getMonth(),
        dtTmp.getDate(),
        dtTmp.getHours(),
        dtTmp.getMinutes(),
        dtTmp.getSeconds()
      );
  }
};

Date.prototype.Format = function(fmt) {
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
};
/**
 * 时间相减得到相应之间的小时数
 * @param date1
 * @param date2
 */
Date.prototype.subtract = function(date2) {
  const Interval = this.getTime() - date2.getTime(); // 得到时间的这毫秒数
  const hour = Math.floor(Interval / 1000 / 3600);
  return hour;
};
/**
 * 时间相减得到相应之间的分钟
 * @param date1
 * @param date2
 */
Date.prototype.subtractMinute = function(date2) {
  const Interval = this.getTime() - date2.getTime(); // 得到时间的这毫秒数
  const minute = Math.floor(Interval / 1000 / 60);
  return minute;
};
/**
 * @fun 获取星期几/周几
 * @param val {Number} (0:周,1:星期);
 **/
Date.prototype.getWeekDay = function(val) {
  let week = weekDay[val];
  return week[this.getDay()];
};
/**
 * @fun 取得周几
 * @constructor
 **/
Date.prototype.GetWeekDay = function() {
  const weekdays = new Array(7);
  weekdays[0] = '周日';
  weekdays[1] = '周一';
  weekdays[2] = '周二';
  weekdays[3] = '周三';
  weekdays[4] = '周四';
  weekdays[5] = '周五';
  weekdays[6] = '周六';

  return weekdays[this.getDay()];
  // weekdays[this.getDay()] +
  // ' ' +
  // this.getDate() +
  // ' -' +
  // this.getHours() +
  // ':00'
};
/**
 * @fun 比较日期
 * @param d1 {String} 日期1
 * @param d2 {String} 两个日期2
 **/
export function compareDate(d1, d2) {
  return new Date(d1.replace(/-/g, '/')) >= new Date(d2.replace(/-/g, '/'));
}

/**
 * @fun 距离当前时间多少（天，月，年）
 * 注：若为时间点，即只有startDate;    若为时间段，即startDate   endDate均存在 ;
 * @param strInterval {String} (D:天,M:月,Y:年);
 * @param startDate {String}
 * @param endDate {String}
 **/
export function timeCalculate(strInterval, startDate, endDate) {
  let dateSpan, iTimes; // iTimes (正 / 负）
  // 若为时间段，即startDate、endDate都有
  if (endDate == null || endDate == undefined) {
    endDate = new Date().Format('YY-MM-DD 00:00:00');
  } else {
    if (startDate != null || startDate != undefined) {
      if (strInterval == 'D') {
        startDate = Date.parse(startDate);
        endDate = Date.parse(endDate);
        dateSpan = endDate - startDate;
        if (dateSpan < 0) {
          iTimes = Math.floor(dateSpan / (24 * 3600 * 1000)); // 向下取整
        } else { iTimes = Math.ceil(dateSpan / (24 * 3600 * 1000)); } // 向上取整
        return iTimes;
      } else if (strInterval == 'M') {
        let startDateNew, endDateNew, startYearNew, endYearNew;
        startDateNew = new Date(startDate).getMonth() + 1; // 获取月份
        endDateNew = new Date(endDate).getMonth() + 1;
        dateSpan = endDateNew - startDateNew;
        startYearNew = new Date(startDate).getFullYear(); // 获取年份
        endYearNew = new Date(endDate).getFullYear();
        let yearSpan = (endYearNew - startYearNew) * 12;
        if (yearSpan == 0) {
          iTimes = dateSpan;
        } else if (yearSpan < 0) {
          if (dateSpan < 0) {
            iTimes = dateSpan + yearSpan;
          } else {
            iTimes = dateSpan + yearSpan;
          }
        } else if (yearSpan > 0) {
          if (dateSpan < 0) {
            iTimes = dateSpan - yearSpan;
          } else {
            iTimes = dateSpan + yearSpan;
          }
        }
        return iTimes;
      } else if (strInterval == 'Y') {
        startDate = new Date(startDate).getFullYear(); // 获取年份
        endDate = new Date(endDate).getFullYear();
        dateSpan = endDate - startDate;
        if (dateSpan == 0) {
          iTimes = 1;
        } else {
          iTimes = dateSpan;
        }
        return iTimes;
      }
    }
  }
}
// 通过时间，算出上一个月最后一天日期
export function getMonthLastDay(date) {
  let curYear = new Date(date).getFullYear();
  let curMon = new Date(date).getMonth() + 1;
  var new_date = new Date(curYear, curMon, 1); // 取当年当月中的第一天
  return new Date(new_date.getTime() - 1000 * 60 * 60 * 24); // 获取当月最后一天日期
}
/**
 日期格式化
*/

export function padDate(va) {
  va = va < 10 ? '0' + va : va;
  return va;
}

// 根据单毫秒值计算时间
export function getDuration(val) {
  let time;
  let days = val / 1000 / 60 / 60 / 24;
  let daysRound = Math.floor(days);
  let hours = val / 1000 / 60 / 60 - 24 * daysRound;
  let hoursRound = Math.floor(hours);
  let minutes = val / 1000 / 60 - 24 * 60 * daysRound - 60 * hoursRound;
  let minutesRound = Math.floor(minutes);
  let seconds = Math.floor(
    val / 1000 -
      24 * 60 * 60 * daysRound -
      60 * 60 * hoursRound -
      60 * minutesRound
  );
  // let time = hoursRound + ':' + minutesRound + ':' + seconds

  if (minutesRound) {
    time =
      padDate(hoursRound) +
      ':' +
      padDate(minutesRound) +
      ':' +
      padDate(seconds);
  } else {
    time = padDate(minutesRound) + ':' + padDate(seconds);
  }
  return time;
}

/**
 日期格式化 yyyy-mm-dd hh:mm:ss
*/
export function formatDate_yyyy_mm_dd_hh_mm_ss(val, num = 0) {
  const value = new Date(new Date(val).getTime() - 24 * 60 * 60 * 1000 * num);
  const year = value.getFullYear();
  const month = padDate(value.getMonth() + 1);
  const day = padDate(value.getDate());
  const hour = padDate(value.getHours());
  const minutes = padDate(value.getMinutes());
  const seconds = padDate(value.getSeconds());
  return (
    year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
  );
}

