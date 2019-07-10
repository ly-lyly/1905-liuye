//HTML文件引入<script src="script/thirdplugins/require.js（require.js路径）" async="true" defer data-main="script/js/index.js（js文件路径）"></script>
//switch方法自动播放都是通过右箭头触发，如果结构中没有箭头，则给轮播图结构内部任意标签添加right类即可实现
//包含轮播图插件(包含taobao幻灯片效果，京东透明度切换效果，tab切换)，楼梯插件
//js文件中
//:require(['../plugins/effects(插件路径)'], function() {
//     tab切换如下配置
//     $('.content').switch({
//        btns: 'tab按钮的选择器',
//        pics: '切换内容区的选择器',
//        activeClass: 'tab按钮的激活类',
//        showClass: '内容区的激活类',
//     })
//     $('banner图的选择器').switch({
//         此处配置参数
//     })
//     $('楼梯的选择器').louti({
//          激活类名前面不加点
//     })
// });
define(['thirdplugins/jquery.min'], function() {
    $.fn.extend({
        //轮播图插件

        switch: function(option) {
            class Switch {
                constructor(option, content) {
                    this.content = $(content);
                    this.option = option;
                    this.setting = {
                        switchType: 'switch', //选择切换的类型，默认switch是在原图上切换，可选move参数，即淘宝幻灯片效果
                        direction: "left", //轮播方向，默认横向left 可选纵向top
                        effect: 'opacity', //图片切换的形式--默认透明度切换，其他字符串均为display切换 switchType:'switch'时有效
                        moveUl: '.ppt', //幻灯片效果移动的ul
                        moveNum: 1, //幻灯片效果移动的图片张数
                        titleMoveable: false, //tab切换标题栏可移动时候的选择器
                        btns: 'ol li', //按钮的选择器
                        pics: 'ul li', //图片的选择器
                        activeClass: 'active', //按钮激活的类名
                        showClass: '', //图片激活的类名,如果通过改变样式改变图片则可不填
                        invoke: 1, //初始显示图片和按钮的索引,任意非负数
                        etype: 'mouseover', //切换方式,默认mouseover,可设置click
                        leftBtn: '.left', //左箭头的选择器
                        rightBtn: '.right', //右箭头选择器
                        showArrow: true, //是否显示箭头,可以为字符串的'true'与'false'
                        autoplay: 0 //自动播放，默认关闭正数开启自动播放，并且为自动播放时间间隔(毫秒),true也可以开启，间隔固定3000
                    };
                    this.init();
                }

                init() {
                    $.extend(true, this.setting, this.option); //配置参数覆盖默认参数,true为深拷贝
                    this.picList = this.content.find(this.setting.pics);
                    this.btnList = this.content.find(this.setting.btns);
                    this.leftBtn = this.content.find(this.setting.leftBtn);
                    this.rightBtn = this.content.find(this.setting.rightBtn);

                    this.autoTimer = null; //自动播放定时器
                    this.num = 0; //当前索引
                    if ($.isNumeric(this.setting.invoke)) { //判断invoke是不是数字
                        if (this.setting.invoke > this.btnList.size()) {
                            this.num = 0; //当前显示的索引
                        } else {
                            this.num = this.setting.invoke;
                        }
                    } else { //不是数字则设置无效，索引从0开始
                        this.num = 0;
                    }
                    if (this.setting.showArrow === true || this.setting.showArrow === 'true') {
                        this.showArrow();
                    }
                    if (this.setting.switchType === 'move') {
                        this.taobaoSwitch();
                    } else {
                        this.btnSwitch();
                        this.lrBtnClick();
                    }

                    this.autoplay();
                }

                taobaoSwitch() { //淘宝幻灯片效果
                    let _this = this;
                    this.moveUl = this.content.find(this.setting.moveUl);
                    this.moveNum = this.setting.moveNum;
                    let lis = this.moveUl.children();
                    let tabNum = lis.size() / this.moveNum; //总共需要切换的次数

                    let firstTab = lis.slice(0, this.moveNum).clone(); //获取第一页显示的li加到最后
                    let lastTab = lis.slice(-this.moveNum).clone(); //获取最后页显示的li加到最前

                    this.moveUl.prepend(lastTab);
                    this.moveUl.append(firstTab);

                    this.moveUl = this.content.find(this.setting.moveUl); //重新获取ul

                    if (this.setting.direction === 'margin-top') {
                        var lHeight = lis.eq(0).outerHeight(true); //单个li的高度
                        var moveDis = lHeight * this.moveNum; //ul每次移动的距离
                        this.moveUl.css({ 'margin-top': -moveDis, height: lHeight * this.moveUl.children().length }); //初始化ul的位置和宽度
                    } else {
                        var lWidth = lis.eq(0).outerWidth(true); //单个li的宽度
                        var moveDis = lWidth * this.moveNum; //ul每次移动的距离
                        this.moveUl.css({ left: -moveDis, width: lWidth * this.moveUl.children().length }); //初始化ul的位置和宽度
                    }
                    this.num = 1;

                    //如果有按钮的话
                    this.btnSwitch(function() {
                        if (_this.setting.direction === 'margin-top') {
                            _this.moveUl.stop(true).animate({
                                'margin-top': -moveDis * (_this.num + 1),
                            })
                        } else {
                            _this.moveUl.stop(true).animate({
                                left: -moveDis * (_this.num + 1),
                            })
                        }
                        _this.btnList.eq(_this.num).addClass(_this.setting.activeClass).siblings().removeClass(_this.setting.activeClass);
                    });

                    //给右箭头添加点击事件
                    this.rightBtn.on('click', () => {
                        this.num++;
                        if (this.setting.direction === 'margin-top') {
                            if (this.num > tabNum) {
                                this.num = 1;
                                this.moveUl.css({ 'margin-top': 0 });
                            }
                            this.moveUl.stop(true).animate({
                                'margin-top': -moveDis * this.num,
                            });
                        } else {
                            if (this.num > tabNum) {
                                this.num = 1;
                                this.moveUl.css({ left: 0 });
                            }
                            this.moveUl.stop(true).animate({
                                left: -moveDis * this.num,
                            });
                        }
                        this.btnList.eq(this.num - 1).addClass(this.setting.activeClass).siblings().removeClass(this.setting.activeClass);
                    });

                    //给左箭头添加点击事件
                    this.leftBtn.on('click', () => {
                        this.num--;
                        if (this.num < 1) {
                            this.num = tabNum;
                            this.moveUl.css({ left: -moveDis * (this.num + 1) });
                        }
                        this.moveUl.stop(true).animate({
                            left: -moveDis * this.num,
                        });
                        this.btnList.eq(this.num - 1).addClass(this.setting.activeClass).siblings().removeClass(this.setting.activeClass);
                    });
                }

                btnSwitch(fn) { //按钮切换
                    let _this = this;
                    if (this.setting.etype === 'mouseover') { //判断切换的形式
                        let timer = null;
                        $(this.btnList).hover(function() {
                            timer = setInterval(() => {
                                _this.num = $(this).index();
                                if (fn && typeof fn === 'function') {
                                    fn();
                                } else {
                                    _this.picSwitch();
                                }
                            }, 300); //给滑过添加定时器
                        }, function() {
                            clearInterval(timer);
                        });
                    } else {
                        $(this.btnList).on('click', function() {
                            _this.num = $(this).index();
                            if (fn && typeof fn === 'function') {
                                fn();
                            } else {
                                _this.picSwitch();
                            }
                        });
                    }
                }

                picSwitch() { //图片切换

                    this.btnList.eq(this.num).addClass(this.setting.activeClass).siblings().removeClass(this.setting.activeClass);
                    if (this.setting.titleMoveable === true) {
                        this.moveTitle = this.btnList.parent(); //标题的ul 宽2000px
                        //不知道怎么写 ，写死了
                        switch (this.num) {
                            case 3:
                                this.moveTitle.stop(true).animate({
                                    left: -142,
                                })
                                break;
                            case 4:
                                this.moveTitle.stop(true).animate({
                                    left: -242,
                                })
                                break;
                            case 5:
                                this.moveTitle.stop(true).animate({
                                    left: -288,
                                })
                                break;
                            case 6:
                                this.moveTitle.stop(true).animate({
                                    left: -288,
                                })
                                break;
                            default:
                                this.moveTitle.stop(true).animate({
                                    left: 0,
                                })
                        }

                    }
                    if (this.setting.effect === 'opacity') { //图片透明度切换
                        if (this.setting.showClass) { //通过类名改变图片显示
                            $(this.picList).css({ 'transition': 'all .5s' })
                            $(this.picList).eq(this.num).addClass(this.setting.showClass).siblings().removeClass(this.setting.showClass);
                        } else { //通过css改变图片显示
                            $(this.picList).css({ 'transition': 'all .5s' })
                            $(this.picList).eq(this.num).css({ 'opacity': '1' }).siblings().css({ 'opacity': '0' });
                        }
                    } else {
                        if (this.setting.showClass) { //通过类名改变图片显示
                            $(this.picList).eq(this.num).addClass(this.setting.showClass).siblings().removeClass(this.setting.showClass);
                        } else { //通过css改变图片显示
                            $(this.picList).eq(this.num).show().siblings().hide();
                        }
                    }
                }

                showArrow() { //显示左右箭头
                    this.content.hover(() => {
                        // this.leftBtn.show();
                        // this.rightBtn.show();
                        this.leftBtn.css('visibility', 'visible');
                        this.rightBtn.css('visibility', 'visible');
                        clearInterval(this.autoTimer);
                    }, () => {
                        // this.leftBtn.hide();
                        // this.rightBtn.hide();
                        this.leftBtn.css('visibility', 'hidden');
                        this.rightBtn.css('visibility', 'hidden');
                        this.autoplay();
                    });
                }

                lrBtnClick() { //左右箭头添加点击事件，轮播图
                    //给右箭头添加点击事件
                    this.rightBtn.on('click', () => {
                        this.num++;
                        if (this.num > this.btnList.length - 1) {
                            this.num = 0;
                        }
                        this.picSwitch();
                    });
                    //给左箭头添加点击事件
                    this.leftBtn.on('click', () => {
                        this.num--;
                        if (this.num < 0) {
                            this.num = this.btnList.length - 1;
                        }
                        this.picSwitch();
                    });
                }

                autoplay() { //自动播放
                    if ($.type(this.setting.autoplay) === 'number' && this.setting.autoplay > 0) {
                        this.autoTimer = setInterval(() => {
                            this.rightBtn.click();
                            // this.num++;
                            // if (this.num > this.btnList.length - 1) {
                            //     this.num = 0;
                            // }
                            //this.picSwitch();
                        }, this.setting.autoplay);
                    } else if (this.setting.autoplay === true || this.setting.autoplay === 'true') {
                        this.autoTimer = setInterval(() => {
                            this.rightBtn.click();
                            // this.num++;
                            // if (this.num > this.btnList.length - 1) {
                            //     this.num = 0;
                            // }
                            //this.picSwitch();
                        }, 3000);
                    }
                }
            }

            $(this).each(function() {
                new Switch(option, this);
            });
        },
        //楼梯插件
        louti: function(option) {
            class Louti {
                constructor(option, stair) {
                    this.stair = $(stair); //整个楼梯
                    this.option = option;
                    this.setting = {
                        floors: '.floor', //选中所有楼层的选择器
                        stairs: 'ul li', //选中所有楼梯的选择器包括回到顶部
                        activeClass: 'on', //楼梯激活的类名，不加点
                        goTop: '.return', //返回顶部的按钮的选择器
                    };
                    this.init();
                    this.climbStairs();
                    this.goTop();
                    this.num = 0; //当前楼层
                }
                init() {
                    $.extend(true, this.setting, this.option);
                    this.floors = $(this.setting.floors);
                    console.log(this.floors);
                    this.goTopBtn = $(this.setting.goTop);
                    this.stairs = this.stair.find(this.setting.stairs).not(this.goTopBtn);
                    console.log(this.stairs);
                    this.firstStair = this.floors.eq(0);
                    this.showStair();
                    this.climbStairs();
                    this.goTop();
                }
                showStair() { //显示楼梯
                    let _this = this;
                    $(window).on('scroll', function() {
                        if ($(window).scrollTop() > _this.firstStair.offset().top - $(window).height() + 100) { //屏幕滚动到第一个楼层标题出现的时候楼梯出现
                            _this.stair.show();
                        } else {
                            _this.stair.hide();
                        }
                    });
                }

                climbStairs() { //爬楼
                    let _this = this;
                    this.stairs.on('click', function() { //点击楼梯
                        // $(window).off('scroll');
                        _this.num = $(this).index();
                        $(this).addClass(_this.setting.activeClass).siblings().removeClass(_this.setting.activeClass);
                        //$('html,body').scrollTop(_this.floors.eq(_this.num).offset().top - $(window).height() + 100)
                        $('html,body').stop(true).animate({
                            scrollTop: _this.floors.eq(_this.num).offset().top - 50
                        })
                    });
                    $(window).on('mousewheel', function() { //滚动条爬楼
                        _this.floors.each(function(index, ele) {
                            if ($(window).scrollTop() > $(ele).offset().top - $(window).height() + 100) {
                                _this.stairs.eq(index).addClass(_this.setting.activeClass).siblings().removeClass(_this.setting.activeClass);
                            }
                        })
                    });
                }

                goTop() {
                    this.goTopBtn.click(function() {
                        //$(window).scrollTop(0);//错误，window不能用来设置滚动条
                        $('body,html').stop(true).animate({
                            scrollTop: 0
                        })
                    });
                }
            }
            $(this.each(function() {
                new Louti(option, this);
            }));
        },

    })
});