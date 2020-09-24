const geojson = {
  features: [
    {
      geometry: { type: "Point", coordinates: ["102.2125", "31.90817"] },
      properties: {
        aqi: 25,
        citycode: "513200",
        cityname: "阿坝州",
        aqilevel: "优",
        time: "2020-02-26 10",
        color: "#43ce17",
        pm25: 22,
        pm10: 32,
        index: 0.88,
        co: 90,
        no2: 50,
        so2: 70,
        o3: 90
      },
      type: "Feature"
    },
    {
      geometry: { type: "Point", coordinates: ["116.4226", "39.9204"] },
      properties: {
        aqi: 25,
        citycode: "513200",
        cityname: "北京",
        aqilevel: "优",
        time: "2020-02-26 10",
        color: "#43ce17",
        pm25: 100,
        pm10: 32,
        index: 0.88,
        co: 90,
        no2: 50,
        so2: 70,
        o3: 10
      },
      type: "Feature"
    }
  ]
}

module.exports = [

  // 模拟点位
  {
    url: '/point/all',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: geojson
      }
    }
  }
]
