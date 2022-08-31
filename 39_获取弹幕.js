let barrageBox = document.getElementById('js-barrage-list');

    function handle(e) {
      let insertItem = e.target;
      try {
        // 只获取弹幕，排除礼物等信息
        let contentDom = insertItem.getElementsByClassName('Barrage-content')[0];
        if (contentDom) {
          let nickName = insertItem.getElementsByClassName('Barrage-nickName')[0].title;
          let content = contentDom.innerText;
          console.log("用户：", nickName, "；弹幕：", content);
        }
      } catch (error) {
        // 有问题肯定就是有其他类型的消息没有考虑到，打印这个元素出来分析
        console.log(insertItem);
      }
    }
    barrageBox.addEventListener('DOMNodeInserted', handle)

    barrageBox.removeEventListener('DOMNodeInserted', handle)