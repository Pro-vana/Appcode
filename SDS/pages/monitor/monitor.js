Page({
    data: {
      opacity: 0.4,
      disabled: true,
      threshold: 0,
      rule: 'up',
      upChecked: false,
      downChecked: false,
      items: [
        { name: 'up', value: '可以拜访' },
        { name: 'down', value: '不可拜访' }
      ]
    },
  
    radioChange: function (e) {
      if (e.detail.value != "") {
        this.setData({
          rule: e.detail.value
        })
      }
      console.log(this.data.rule)
    },
  
  
  
    getDataFromOneNet: function () {
      var that = this;
      const requestTask = wx.request({
        url: 'https://api.heclouds.com/devices/23248275/datapoints?datastream_id=Light,HumanSensor&limit=1',
        header: {
          'content-type': 'application/json',
          'api-key': 'x6=np0UwzAjUPTCgdF2flCO4XGY='
        },
        success: function (res) {
          that.setData({
            upChecked: false,
            sleepChecked: false,
            lightChecked: false,
            downChecked: false
          })
          var app = getApp()
  
          app.globalData.light = res.data.data.datastreams[0]
          app.globalData.humensensor = res.data.data.datastreams[1]
  
          console.log(app.globalData.light.datapoints[0].value)
          var light = app.globalData.light.datapoints[0].value
          console.log(app.globalData.humensensor.datapoints[0].value)
          var human = app.globalData.humensensor.datapoints[0].value
  
          var lightFlag = (light > 100)
          var humanFlag = Number(human)
  
          console.log("lightFlag : " + lightFlag)
          console.log("humanFlag : " + humanFlag)
          if (humanFlag && lightFlag) {
            console.log("!!!")
            that.setData({
              upChecked: true
            })
          } else if (humanFlag && !lightFlag) {
            that.setData({
              sleepChecked: true
            })
          } else if (!humanFlag && lightFlag) {
            that.setData({
              lightChecked: true
            })
          } else if (!humanFlag && !lightFlag) {
            that.setData({
              downChecked: true
            })
          }
  
        },
        fail: function (res) {
          console.log("fail!!!")
        },
        complete: function (res) {
          console.log("end")
        }
      })
    },
    clearColor: function () {
      // console.log("!!!")
      this.setData({
        upChecked: false,
        sleepChecked: false,
        lightChecked: false,
        downChecked: false
      })
    },
  })