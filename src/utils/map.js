/**
 * @function getPollColor
 * @Fun 标准样式 首页 污染物浓度、等级、颜色
 * @param polName {String} 污染物类型  aqi pm25 ..
 * * @param polValue {Number} 值
 * @param timeType {String} 时间类型
 */
export function getPollColor(polName, polValue, timeType) {
  let color = ''
  const subLevle = {}
  let level = 0
  if (polValue === null || polValue === '' || polValue < 0) {
    subLevle.color = '#d1d1d1'
    subLevle.level = -1
    return subLevle
  }
  const colors = ['#43ce17', '#efdc31', '#fa0', '#ff401a', '#d20040', '#9c0a4e']

  if (polName === 'aqi') {
    // ---------------------AQI----------------
    if (polValue <= 50) {
      level = 0
      color = colors[0]
    } else if (polValue >= 50 && polValue <= 100) {
      level = 1
      color = colors[1]
    } else if (polValue > 100 && polValue <= 150) {
      level = 2
      color = colors[2]
    } else if (polValue > 150 && polValue <= 200) {
      level = 3
      color = colors[3]
    } else if (polValue > 200 && polValue <= 300) {
      level = 4
      color = colors[4]
    } else if (polValue > 300) {
      level = 5
      color = colors[5]
    }
  } else if (polName === 'so2') {
    // -----------------SO₂------------------------
    if (timeType === 'hour') {
      // 小时
      if (polValue <= 150) {
        level = 0
        color = colors[0]
      } else if (polValue <= 500 && polValue > 150) {
        level = 1
        color = colors[1]
      } else if (polValue <= 650 && polValue > 500) {
        level = 2
        color = colors[2]
      } else if (polValue <= 800 && polValue > 650) {
        level = 3
        color = colors[3]
      } else {
        level = 4
        color = colors[4]
      }
    } else {
      // 天 月 年
      if (polValue <= 50) {
        level = 0
        color = colors[0]
      } else if (polValue <= 150 && polValue > 50) {
        level = 1
        color = colors[1]
      } else if (polValue <= 475 && polValue > 150) {
        level = 2
        color = colors[2]
      } else if (polValue <= 800 && polValue > 475) {
        level = 3
        color = colors[3]
      } else if (polValue <= 1600 && polValue > 800) {
        level = 4
        color = colors[4]
      } else if (polValue <= 2100 && polValue > 1600) {
        level = 5
        color = colors[5]
      } else {
        level = 5
        color = colors[5]
      }
    }
  } else if (polName === 'no2') {
    // ------------------NO₂-----------------------
    if (timeType === 'hour') {
      // 小时
      if (polValue <= 100) {
        level = 0
        color = colors[0]
      } else if (polValue <= 200 && polValue > 100) {
        level = 1
        color = colors[1]
      } else if (polValue <= 700 && polValue > 200) {
        color = colors[2]
        level = 2
      } else if (polValue <= 1200 && polValue > 700) {
        level = 3
        color = colors[3]
      } else if (polValue <= 2340 && polValue > 1200) {
        level = 4
        color = colors[4]
      } else if (polValue <= 3090 && polValue > 2340) {
        level = 5
        color = colors[5]
      } else {
        level = 5
        color = colors[5]
      }
    } else {
      // 天 月 年
      if (polValue <= 40) {
        level = 0
        color = colors[0]
      } else if (polValue <= 80 && polValue > 40) {
        level = 1
        color = colors[1]
      } else if (polValue <= 180 && polValue > 80) {
        level = 2
        color = colors[2]
      } else if (polValue <= 280 && polValue > 180) {
        level = 3
        color = colors[3]
      } else if (polValue <= 565 && polValue > 280) {
        level = 4
        color = colors[4]
      } else if (polValue <= 750 && polValue > 565) {
        level = 5
        color = colors[5]
      } else {
        level = 5
        color = colors[5]
      }
    }
  } else if (polName === 'pm25') {
    // ------------------PM₂.₅---------
    if (polValue <= 35) {
      level = 0
      color = colors[0]
    } else if (polValue <= 75 && polValue > 35) {
      level = 1
      color = colors[1]
    } else if (polValue <= 115 && polValue > 75) {
      level = 2
      color = colors[2]
    } else if (polValue <= 150 && polValue > 115) {
      level = 3
      color = colors[3]
    } else if (polValue <= 250 && polValue > 150) {
      level = 4
      color = colors[4]
    } else if (polValue <= 350 && polValue > 250) {
      level = 5
      color = colors[5]
    } else {
      level = 5
      color = colors[5]
      color = '#800000'
    }
  } else if (polName === 'pm10') {
    // ------------------PM₁₀---------
    if (polValue <= 50) {
      level = 0
      color = colors[0]
    } else if (polValue <= 150 && polValue > 50) {
      level = 1
      color = colors[1]
    } else if (polValue <= 250 && polValue > 150) {
      level = 2
      color = colors[2]
    } else if (polValue <= 350 && polValue > 250) {
      level = 3
      color = colors[3]
    } else if (polValue <= 420 && polValue > 350) {
      level = 4
      color = colors[4]
    } else if (polValue <= 500 && polValue > 420) {
      level = 5
      color = colors[5]
    } else {
      level = 5
      color = colors[5]
    }
  } else if (polName === 'co') {
    // ---------------------CO-----------------
    if (timeType === 'hour') {
      // 小时
      if (polValue <= 5) {
        level = 0
        color = colors[0]
      } else if (polValue <= 10 && polValue > 5) {
        level = 1
        color = colors[1]
      } else if (polValue <= 35 && polValue > 10) {
        color = colors[2]
      } else if (polValue <= 60 && polValue > 35) {
        color = colors[3]
      } else if (polValue <= 90 && polValue > 60) {
        color = colors[4]
      } else if (polValue <= 120 && polValue > 90) {
        color = colors[5]
      } else {
        color = colors[5]
      }
    } else {
      // 天 月 年
      if (polValue <= 2) {
        color = colors[0]
      } else if (polValue <= 4 && polValue > 2) {
        color = colors[1]
      } else if (polValue <= 14 && polValue > 4) {
        color = colors[2]
      } else if (polValue <= 24 && polValue > 14) {
        color = colors[3]
      } else if (polValue <= 36 && polValue > 24) {
        color = colors[4]
      } else if (polValue <= 48 && polValue > 36) {
        color = colors[5]
      } else {
        color = colors[5]
      }
    }
  } else if (polName === 'o3' || polName === 'o3_8h') {
    // ---------------------O3-----------------
    if (timeType === 'hour') {
      // 小时
      if (polValue <= 160) {
        level = 0
        color = colors[0]
      } else if (polValue <= 200 && polValue > 160) {
        level = 1
        color = colors[1]
      } else if (polValue <= 300 && polValue > 200) {
        level = 2
        color = colors[2]
      } else if (polValue <= 400 && polValue > 300) {
        level = 3
        color = colors[3]
      } else if (polValue <= 800 && polValue > 400) {
        level = 4
        color = colors[4]
      } else if (polValue <= 1000 && polValue > 800) {
        level = 5
        color = colors[5]
      } else {
        level = 5
        color = colors[5]
      }
    } else {
      // 8小时
      if (polValue <= 100) {
        level = 0
        color = colors[0]
      } else if (polValue <= 160 && polValue > 100) {
        level = 1
        color = colors[1]
      } else if (polValue <= 215 && polValue > 160) {
        level = 2
        color = colors[2]
      } else if (polValue <= 265 && polValue > 215) {
        level = 3
        color = colors[3]
      } else {
        level = 4
        color = colors[4]
      }
    }
  } else if (polName === 'index') {
    if (polValue <= 4) {
      level = 0
      color = colors[0]
    } else if (polValue > 4 && polValue <= 6) {
      level = 1
      color = colors[1]
    } else if (polValue > 6 && polValue <= 8) {
      level = 2
      color = colors[2]
    } else if (polValue > 8 && polValue <= 10) {
      level = 3
      color = colors[3]
    } else if (polValue > 10 && polValue <= 12) {
      level = 4
      color = colors[4]
    } else {
      color = colors[5]
      level = 5
    }
  } else if (polName === 'temp') {
    // ---------------------AQI----------------
    if (polValue <= 50) {
      level = 0
      color = colors[0]
    } else if (polValue >= 50 && polValue < 100) {
      level = 1
      color = colors[1]
    } else if (polValue >= 100 && polValue < 150) {
      level = 2
      color = colors[2]
    } else if (polValue >= 150 && polValue < 200) {
      level = 3
      color = colors[3]
    } else if (polValue >= 200 && polValue < 300) {
      level = 4
      color = colors[4]
    } else if (polValue > 300) {
      level = 5
      color = colors[5]
    }
  }
  subLevle.color = color
  subLevle.level = level
  return subLevle
}
