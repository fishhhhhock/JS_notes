// 循环发送弹幕，3秒发一条
(function() {
    let arr = [
      '速速骄阳似火，七星高照', '主播，你是做什么工作的', '恋爱吗，我代恋', '刚子，到饭点了',
      '许刚的刚不许刚', '看好我的操作，接下来，我将一次不死并且超神',
      '屏幕里有两个小矮子，另一个我不说是谁',
    ];
    let idx = 0;
    function send(msg) {
      document.getElementsByClassName('ChatSend-txt')[0].value = msg;
      document.getElementsByClassName('ChatSend-button')[0].click();
      idx++;
      if (idx >= arr.length) return false;
      setTimeout(function () {
        send(arr[idx % arr.length])
      }, 3000)
    }
    send(arr[idx]);
  })()