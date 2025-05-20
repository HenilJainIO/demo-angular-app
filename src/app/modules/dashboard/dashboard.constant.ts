export const ALL_WIDGETS = [
  {
    type : 'lastDp',
    position : {
      x : 16,
      y : 0
    },
    width : 400,
    height : 210,
    devID : 'APRPLC_A3',
    sensorList:['D19','D20'],
    styleConfig : {
      backGroundColor : '#ffffff',
      padding : '4',
      borderSize: '2',
      borderColor : '#cccccc',
      borderStyle : 'solid',
      fontColor : 'green',
      borderRadius : '4',
      zIndex : 1
    }
  },
  {
    type : 'lineChart',
    position : {
      x : 16,
      y : 420
    },
    width : 880,
    height : 380,
    devID : 'APRPLC_A3',
    sensorList:['D19','D20'],
    styleConfig : {
      backGroundColor : '#ffffff',
      padding : '8',
      borderSize: '2',
      borderColor : '#ffffff',
      borderStyle : 'solid',
      fontColor : 'green',
      borderRadius : '8',
      zIndex : 1
    }
  },
  {
    type : 'pieChart',
    position : {
      x : 244,
      y : 0
    },
    width : 400,
    height : 320,
    devConfig : [
      {
        devID : '',
        sensorID : ''
      }
    ],
    styleConfig : {
      backGroundColor : '#ffffff',
      padding : '4',
      borderSize: '2',
      borderColor : '#ffffff',
      borderStyle : 'solid',
      fontColor : 'green',
      borderRadius : '4',
      zIndex : 1
    }
  },
  {
    type : 'barChart',
    position : {
      x : 416,
      y : 420
    },
    width : 880,
    height : 380,
    devID : 'APRPLC_A3',
    sensorList:['D19','D20'],
    styleConfig : {
      backGroundColor : '#ffffff',
      padding : '8',
      borderSize: '2',
      borderColor : '#ffffff',
      borderStyle : 'solid',
      fontColor : 'green',
      borderRadius : '8',
      zIndex : 1
    }
  },
]