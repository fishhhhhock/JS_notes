// 功能需求：1.点击tab栏，可以切换效果
//          2.点击+号，可以添加tab项和内容项
                // （1）创建新的选项卡li和新的内容section
                // （2）把创建的两个元素追加到对应的父元素中
//          3.点击x号，可以删除当前的tab项和内容项
//          4.双击tab项文字或者内容项文字，可以修改里面的文字内容
var that;
class Tab{
    constructor(id){
        that = this;
        // 获取元素
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        this.remove = this.main.querySelector('.icon-guanbi')
        // li的父元素
        this.ul = this.main.querySelector('.fisrstnav ul:first-child')
        // section的父元素
        this.fsections = this.main.querySelector('.tabscon')
        this.init()
    }
    init(){
        this.updateNode()
        // init初始化操作让相关的元素绑定事件
        this.add.onclick = this.addTab;
        for(var i = 0;i < this.lis.length; i++){
            // index获取li的索引号
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            // 如果添加括号就会立即调用，没有加的话是点击后才会触发的事件
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTAb;
            this.sections[i].ondblclick = this.editTAb;
        }
    }
    // 1.切换功能
    toggleTab(){

        that.clearClass();
        this.className = 'liactive'
        that.sections[this.index].className = 'conactive';
    }
    // 排他思想清除类名
    clearClass(){
        // 因为是使用that调用，所以这里的this就是that
        for(var i = 0;i<this.lis.length;i++){
            this.lis[i].className = '';
            this.sections[i].className = '';
 
        }
    }
    // 每增加一个li和section都要重新获取一次，不然就不会刷新
    updateNode(){
        this.remove = this.main.querySelectorAll('.icon-guanbi')
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child')
    }
   
    // 2.添加功能
    addTab(){
        that.clearClass();
        // 利用insertAdjacentHTML()可以直接把字符串格式元素添加到父元素中
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>'
        var section = '<section class="conactive">新建选项卡</section>'
        that.ul.insertAdjacentHTML('beforeend',li)
        that.fsections.insertAdjacentHTML('beforeend',section)
        that.init();
    }
    // 3.删除功能
    removeTab(e){
        e.stopPropagation();//阻止冒泡，防止li的切换
        var index = this.parentNode.index;
        // 根据索引号删除对应的li和section  remove()方法可以直接删除指定的元素
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        // 当我们删除的不是选中状态的li,原来的选中状态li保持不变
        if(document.querySelector('.liactive')) return;
        // 当删除了这个选中状态的li,让前一个li自动处于选中状态
        index--;
        // 手动调用点击事件  ()
        that.lis[index] && that.lis[index].click();
    }
    // 4.修改功能
    editTAb(){
        //双击选项卡li或者 section里面的文字,可以实现修改功能
            // 双击事件是:  ondblclick
            // 如果双击文字,会默认选定文字,此时需要双击禁止选中文字
            // window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            // 核心思路:  双击文字的时候, 在 里面生成一个文本框, 当失去焦点或者按下回车然后把文本框输入的值给原先元素即可.
           var str = this.innerHTML;//先将原本的内容获取过来
        //    双击禁止选定文字
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text" />';
        var input = this.children[0];//文本框input  是span的第一个孩子
        input.value = str;//将原本的内容重新放入文本框
        input.select();//使文本框里面的文字处于被选中状态
        //当我们离开文本框就把文本框里面的内容给span
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        }
        // 按下回车也可以把文本框里面的值给span
        input.onkeyup = function(e){
            if(e.keyCode === 13){
                // 手动调用失去焦点事件
                this.blur();
            }
        }
            // alert('111')
    }
}
new Tab('#tab')