/*
 * 城市选择jquer插件
 *
 * Licensed under the MIT license:
 * https://github.com/callmeJozo/kuCity
 *
 * Author: Naraku(http://segmentfault.com/u/naraku_)
 *
 * Version:  1.0
 *
 */

/**weather.js中部分函数需要在KuCity.js中用到, 但奇怪的是无法直接引用(提示未定义), 临时的解决方案是把这几个函数的定义在这里也贴一遍, 后续再想办法**/

//监听城市名输入栏, 宽度随着城市名字长度而变化
function cityIptWidth() {
    cityName = $("#citySelect").val();
    cityUrlCode = "%E5%B9%BF%E5%B7%9E";
    var cityNameNum = cityName.length;
    $("#citySelect").css("width", (cityNameNum * 18 + 30) + "px");
}

//随机背景
function randomBgGrad() {
    var randNum = Math.floor(Math.random() * 7);
    $("#bgImg").attr("class", "bgImg bgGrad" + randNum);
    //console.trace("bgGrad" + randNum);
}

/**结合HTML5的geolocation功能进行定位, 同时结合百度地图API逆向解析获得城市名**/
function getCity() {
    // 检测浏览器是否支持地理定位功能
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert('抱歉, 您的浏览器不支持定位功能, 请手动切换至您需要查询天气的城市...');
    }

    // 得到坐标信息
    function showPosition(position) {
        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        //alert("经度: " + longitude + "纬度: " + latitude);

        // 使用百度地图JS API
        var point = new BMap.Point(longitude, latitude);

        var geoc = new BMap.Geocoder();
        geoc.getLocation(point, function(rs) {
            var addComp = rs.addressComponents;
            cityName = addComp.city;
            cityUrlCode = encodeURIComponent(cityName);
            /*聚合天气API获取天气时, 城市名需转换为相应的URL编码, 可以用JS内置的功能encodeURIComponent()*/
            $("#citySelect").val(cityName);
            cityIptWidth();
        });
    }

    // 得到错误信息
    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("抱歉, 您拒绝了浏览器的定位请求, 请手动切换至您需要查询天气的城市...");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("抱歉, 位置信息不可用, 请手动切换至您需要查询天气的城市...");
                break;
            case error.TIMEOUT:
                alert("抱歉, 浏览器定位超时, 请刷新重试或手动切换至您需要查询天气的城市...");
                break;
            case error.UNKNOWN_ERROR:
                alert("抱歉, 未知错误, 请刷新重试或手动切换至您需要查询天气的城市...");
                break;
        }
    }
}


function getWeather() {

    $.ajax({
        "url": "https://v.juhe.cn/weather/index?cityname=" + cityUrlCode + "&dtype=&format=&key=6e33b4a7f611a7efc7096d721a107dc5",
        //"url": "https://v.juhe.cn/weather/index?cityname=%E5%B9%BF%E5%B7%9E&dtype=&format=&key=864095a380",
        "type": "GET",
        "dataType": "JSONP",
        "data": "",
        "success": function(result) {
            var k = 1;
            weatherRep = ["<br>", "<br>", "<br>", "<br>", "<br>", "<br>", "<br>", "<br>"];
            /**珍惜API测试次数**/
            if (result.result === null) {
                result = {
                    "resultcode": "200",
                    "reason": "successed!",
                    "result": {
                        "sk": {
                            "temp": "24",
                            "wind_direction": "北风",
                            "wind_strength": "2级",
                            "humidity": "93%",
                            "time": "22:07"
                        },
                        "today": {
                            "temperature": "23℃~27℃",
                            "weather": "多云转晴",
                            "weather_id": {
                                "fa": "10",
                                "fb": "09"
                            },
                            "wind": "3-4 级",
                            "week": "星期一",
                            "city": "广州",
                            "date_y": "2017年05月15日",
                            "dressing_index": "舒适",
                            "dressing_advice": "建议着长袖T恤、衬衫加单裤等服装。年老体弱者宜着针织长袖衬衫、马甲和长裤。",
                            "uv_index": "最弱",
                            "comfort_index": "",
                            "wash_index": "不宜",
                            "travel_index": "较不宜",
                            "exercise_index": "较不宜",
                            "drying_index": ""
                        },
                        "future": {
                            "day_20170515": {
                                "temperature": "23℃~27℃",
                                "weather": "多云转晴",
                                "weather_id": {
                                    "fa": "10",
                                    "fb": "09"
                                },
                                "wind": "3-4 级",
                                "week": "星期一",
                                "date": "20170515"
                            },
                            "day_20170516": {
                                "temperature": "24℃~29℃",
                                "weather": "多云",
                                "weather_id": {
                                    "fa": "01",
                                    "fb": "01"
                                },
                                "wind": "微风",
                                "week": "星期二",
                                "date": "20170516"
                            },
                            "day_20170517": {
                                "temperature": "22℃~27℃",
                                "weather": "晴",
                                "weather_id": {
                                    "fa": "01",
                                    "fb": "01"
                                },
                                "wind": "南风2-3 级",
                                "week": "星期三",
                                "date": "20170517"
                            },
                            "day_20170518": {
                                "temperature": "20℃~26℃",
                                "weather": "晴转小雨",
                                "weather_id": {
                                    "fa": "01",
                                    "fb": "01"
                                },
                                "wind": "微风",
                                "week": "星期四",
                                "date": "20170518"
                            },
                            "day_20170519": {
                                "temperature": "19℃~26℃",
                                "weather": "多云转雷阵雨",
                                "weather_id": {
                                    "fa": "01",
                                    "fb": "04"
                                },
                                "wind": "东风3-4 级",
                                "week": "星期五",
                                "date": "20170519"
                            },
                            "day_20170520": {
                                "temperature": "18℃~24℃",
                                "weather": "中雨转大雨",
                                "weather_id": {
                                    "fa": "01",
                                    "fb": "01"
                                },
                                "wind": "微风",
                                "week": "星期六",
                                "date": "20170520"
                            },
                            "day_20170521": {
                                "temperature": "20℃~27℃",
                                "weather": "晴转多云",
                                "weather_id": {
                                    "fa": "01",
                                    "fb": "01"
                                },
                                "wind": "微风",
                                "week": "星期日",
                                "date": "20170521"
                            }
                        }
                    },
                    "error_code": 0
                };
            }
            /**珍惜API测试次数**/
            /**获取今日天气**/
            var tdObj = result.result.today;
            //console.log(tdObj.weather);
            $("#tdWe").html(tdObj.weather);
            $("#tdTemp").html(tdObj.temperature);
            $("#tdClm").html(tdObj.dressing_index);
            $("#tdUv").html(tdObj.uv_index);
            $("#tdExer").html(tdObj.exercise_index);
            $("#tdTravl").html(tdObj.travel_index);
            $("#tdWash").html(tdObj.wash_index);
            $("#tdTips").html(tdObj.dressing_advice);

            //定义天气图标函数, 根据当天天气关键词切换对应图标
            //console.log(/暴雨/.test(tdObj.weather));

            function weatherImg(weDay, imgEle) {
                //console.log("imgEle = " + JSON.stringify(imgEle, null, 4));
                switch (true) {
                    case /晴转多云/.test(weDay):
                        imgEle.src = "weImgs/sunnyToCloudy.png";
                        break;
                    case /多云转晴/.test(weDay):
                        imgEle.src = "weImgs/sunnyToCloudy.png";
                        break;
                    case /暴雨/.test(weDay):
                        imgEle.src = "weImgs/heavyRain.png";
                        break;
                    case /大雨/.test(weDay):
                        imgEle.src = "weImgs/heavyRain.png";
                        break;
                    case /雷阵雨/.test(weDay):
                        imgEle.src = "weImgs/thunderRain.png";
                        break;
                    case /阵雨/.test(weDay):
                        imgEle.src = "weImgs/shower.png";
                        break;
                    case /雷/.test(weDay):
                        imgEle.src = "weImgs/thunder.png";
                        break;
                    case /小雨/.test(weDay):
                        imgEle.src = "weImgs/lightRain.png";
                        break;
                    case /雨/.test(weDay):
                        imgEle.src = "weImgs/lightRain.png";
                        break;
                    case /冰雹/.test(weDay):
                        imgEle.src = "weImgs/hailNdRain.png";
                        break;
                    case /雨夹雪/.test(weDay):
                        imgEle.src = "weImgs/snowNdRain.png";
                        break;
                    case /大雪/.test(weDay):
                        imgEle.src = "weImgs/heavySnow.png";
                        break;
                    case /小雪/.test(weDay):
                        imgEle.src = "weImgs/lightSnow.png";
                        break;
                    case /阴/.test(weDay):
                        imgEle.src = "weImgs/cloudy.png";
                        break;
                    case /雾/.test(weDay):
                        imgEle.src = "weImgs/fog.png";
                        break;
                    case /霾/.test(weDay):
                        imgEle.src = "weImgs/haze.png";
                        break;
                    case /晴/.test(weDay):
                        imgEle.src = "weImgs/sunny.png";
                        break;
                    default:
                        imgEle.src = "weImgs/sunnyToCloudy.png";
                        break;
                }
            }
            var tdWe = tdObj.weather,
                tdImg = $(".weImgTd")[0];
            //console.log("tdImg.src = " + tdImg.src);
            weatherImg(tdWe, tdImg);

            /**获取未来天气**/
            var daysObj = result.result.future,
                daysObjKeys = [];
            //console.log("daysObj = " + JSON.stringify(daysObj, null, 4));

            for (var daysObjKey in daysObj) {
                daysObjKeys.push(daysObjKey);
            }

            for (var d = 1; d < 7; d++) {
                //day从1开始取值而非0是因为当天天气情况的获取方式不一样
                var days = daysObj[daysObjKeys[d]];
                var keysZhOrg = ["温度", "天气", "风力", "星期", "日期"],
                    keysZh = ["星期", "日期", "天气", "风力", "温度"],
                    i = 0,
                    order,
                    keysArr = [];

                for (var key in days) {
                    if (key !== "weather_id") {
                        keysArr.push(key);
                    }
                }

                for (key in days) {
                    if (key !== "weather_id") {
                        for (j = 0; j < 5; j++) {
                            if (keysZhOrg[j] === keysZh[i]) {
                                order = keysArr[j];
                            }
                        }
                        //日期后面加个空行
                        if (key === "weather") {
                            weatherRep[k] += days[order] + "<br>" + "<br>";
                        } else {
                            weatherRep[k] += days[order] + "<br>";
                        }
                        //得出天气关键词并给相应位置加上天气图标
                        if (key === "wind") {
                            //console.trace(days[order]);
                            //当key对应"wind"时, days[order]对应的是future里面某一天的weather
                            var fuWe = days[order],
                                fuImgClt = $(".weImgFu"),
                                fuImg = $(".weImgFu")[d - 1];
                            weatherImg(fuWe, fuImg);
                            //console.trace(fuImg.src);
                        }
                        i++;
                    }
                }
                weatherRep[k] += "<br>";

                $("#showWeather" + k).html(weatherRep[k]);
                k++;
            }
        }
    });
}


(function($) {
    var allCities = ['北京|beijing|bj', '上海|shanghai|sh', '广州|guangzhou|gz', '深圳|shenzhen|sz', '杭州|hangzhou|hz', '重庆|chongqing|cq',
        '南京|nanjing|nj', '苏州|shuzhou|sz', '天津|tianjin|tj', '成都|chengdu|cd', '武汉|wuhan|wh', '南昌|nanchang|nc', '青岛|qingdao|qd',
        '厦门|xiamen|xm', '西安|xian|xa', '长沙|changsha|cs', '合肥|hefei|hf', '西藏|xizang|xz', '内蒙古|neimenggu|nmg', '安庆|anqing|aq', '阿泰勒|ataile|atl', '安康|ankang|ak',
        '阿克苏|akesu|aks', '包头|baotou|bt', '北海|beihai|bh', '百色|baise|bs', '保山|baoshan|bs', '长治|changzhi|cz', '长春|changchun|cc', '常州|changzhou|cz', '昌都|changdu|cd',
        '朝阳|chaoyang|cy', '常德|changde|cd', '长白山|changbaishan|cbs', '赤峰|chifeng|cf', '东莞|dongguan|dg', '大连|dalian|dl', '达县|daxian|dx', '东营|dongying|dy', '大庆|daqing|dq', '丹东|dandong|dd',
        '大理|dali|dl', '敦煌|dunhuang|dh', '鄂尔多斯|eerduosi|eeds', '恩施|enshi|es', '福州|fuzhou|fz', '佛山|foshan|fs', '阜阳|fuyang|fy', '贵阳|guiyang|gy',
        '桂林|guilin|gl', '广元|guangyuan|gy', '格尔木|geermu|gem', '呼和浩特|huhehaote|hhht', '哈密|hami|hm',
        '黑河|heihe|hh', '海拉尔|hailaer|hle', '哈尔滨|haerbin|heb', '海口|haikou|hk', '黄山|huangshan|hs', '邯郸|handan|hd',
        '汉中|hanzhong|hz', '黄冈|huanggang|hg', '晋江|jinjiang|jj', '锦州|jinzhou|jz', '景德镇|jingdezhen|jdz',
        '嘉峪关|jiayuguan|jyg', '井冈山|jinggangshan|jgs', '济宁|jining|jn', '九江|jiujiang|jj', '佳木斯|jiamusi|jms', '济南|jinan|jn', '荆州|jingzhou|jz',
        '喀什|kashi|ks', '昆明|kunming|km', '康定|kangding|kd', '克拉玛依|kelamayi|klmy', '库尔勒|kuerle|kel', '库车|kuche|kc', '兰州|lanzhou|lz',
        '洛阳|luoyang|ly', '丽江|lijiang|lj', '林芝|linzhi|lz', '柳州|liuzhou|lz', '泸州|luzhou|lz', '连云港|lianyungang|lyg', '黎平|liping|lp',
        '连成|liancheng|lc', '拉萨|lasa|ls', '临沧|lincang|lc', '临沂|linyi|ly', '芒市|mangshi|ms', '牡丹江|mudanjiang|mdj', '满洲里|manzhouli|mzl', '绵阳|mianyang|my',
        '梅县|meixian|mx', '漠河|mohe|mh', '南充|nanchong|nc', '南宁|nanning|nn', '南阳|nanyang|ny', '南通|nantong|nt', '那拉提|nalati|nlt',
        '宁波|ningbo|nb', '攀枝花|panzhihua|pzh', '衢州|quzhou|qz', '秦皇岛|qinhuangdao|qhd', '庆阳|qingyang|qy', '齐齐哈尔|qiqihaer|qqhe',
        '石家庄|shijiazhuang|sjz', '沈阳|shenyang|sy', '思茅|simao|sm', '随州|suizhou|sz', '铜仁|tongren|tr', '塔城|tacheng|tc', '腾冲|tengchong|tc', '台州|taizhou|tz',
        '通辽|tongliao|tl', '太原|taiyuan|ty', '威海|weihai|wh', '梧州|wuzhou|wz', '文山|wenshan|ws', '无锡|wuxi|wx', '潍坊|weifang|wf', '武夷山|wuyishan|wys', '乌兰浩特|wulanhaote|wlht',
        '温州|wenzhou|wz', '乌鲁木齐|wulumuqi|wlmq', '万州|wanzhou|wz', '乌海|wuhai|wh', '兴义|xingyi|xy', '西昌|xichang|xc', '襄樊|xiangfan|xf',
        '西宁|xining|xn', '锡林浩特|xilinhaote|xlht', '西双版纳|xishuangbanna|xsbn', '徐州|xuzhou|xz', '孝感|xiaogan|xg', '仙桃|xiantao|xt', '义乌|yiwu|yw', '永州|yongzhou|yz', '榆林|yulin|yl', '延安|yanan|ya', '运城|yuncheng|yc',
        '烟台|yantai|yt', '银川|yinchuan|yc', '宜昌|yichang|yc', '宜宾|yibin|yb', '盐城|yancheng|yc', '延吉|yanji|yj', '玉树|yushu|ys', '伊宁|yining|yn', '珠海|zhuhai|zh', '昭通|zhaotong|zt',
        '张家界|zhangjiajie|zjj', '舟山|zhoushan|zs', '郑州|zhengzhou|zz', '中卫|zhongwei|zw', '芷江|zhijiang|zj', '湛江|zhanjiang|zj'
    ];
    var regEx = /^([\u4E00-\u9FA5\uf900-\ufa2d]+)\|(\w+)\|(\w)\w*$/i, // 匹配汉字，拼音
        regExChiese = /([\u4E00-\u9FA5\uf900-\ufa2d]+)/, // 只匹配拼音
        reg_ah = /^[a-h]$/i, // 匹配首字母为 a-h
        reg_ip = /^[i-p]/i, // 匹配首字母为 i-p
        reg_qz = /^[q-z]/i; // 匹配首字母为 q-z

    //构建城市分类字面量
    var city = {
        hot: {},
        ABCDEFGH: {},
        IJKLMNOP: {},
        QRSTUVWXYZ: {}
    };

    //城市按首字母分类，填充到分类字面量
    (function() {
        for (var i = 0, len = allCities.length; i < len; i++) {
            var part = regEx.exec(allCities[i]),
                en = part[1], //中文名
                letter = part[2], //拼音
                spletter = part[3], //拼音简写
                first = letter[0].toUpperCase(), //拼音首字母
                ltPart; //当前字母下的城市

            if (reg_ah.test(first)) {
                ltPart = 'ABCDEFGH';
            } else if (reg_ip.test(first)) {
                ltPart = 'IJKLMNOP';
            } else if (reg_qz.test(first)) {
                ltPart = 'QRSTUVWXYZ';
            }

            city[ltPart][first] ? city[ltPart][first].push(en) : (city[ltPart][first] = [], city[ltPart][first].push(en));

            //设置前16个城市为热门城市
            if (i < 16) {
                city.hot.hot ? city.hot.hot.push(part[1]) : (city.hot.hot = [], city.hot.hot.push(part[1]));
            }
        }
    })();

    var KuCity = function(target) {
        this.target = target; // 输入框
        this.container = null; //插件容器
        this.resultct = null; //搜索结果容器
        this.isKeyslect = false; //是否在用上下键选择
        this.isContainerExit = false; // 插件容器是否已存在
    };

    KuCity.prototype = {
        constructor: KuCity,
        //初始化
        init: function() {
            this.creatItem();
            this.tabChange();
            this.citySelect();
            this.inputSearch();
            this.keySelect();
            this.stopPropagation();
        },
        //创建市列表
        creatItem: function() {
            if (this.isContainerExit) return;
            var template = '<div class="kucity"><div class="citybox"><h3 class="kucity_header">注: <span class="cityNameIpt">城市名支持汉字/拼音搜索, 可在上方输入框中直接输入, </span>你也可以<a id="getCity" class="getCity" onclick="getCity()">点我尝试地理位置自动识别</a></h3><ul class="kucity_nav"><li class="active">热门城市</li><li>ABCDEFGH</li><li>IJKLMNOP</li><li>QRSTUVWXYZ</li></ul><div class="kucity_body"></div></div><ul class="result"></ul></div>';
            $('body').append(template);

            this.container = $('.kucity');
            this.resultct = $('.result');

            for (var group in city) {
                var itemKey = [];

                for (var item in city[group]) {
                    itemKey.push(item);
                }
                itemKey.sort();
                var itembox = $('<div class="kucity_item">');
                itembox.addClass(group);

                for (var i = 0, iLen = itemKey.length; i < iLen; i++) {

                    var dl = $('<dl>'),
                        dt = '<dt>' + (itemKey[i] == 'hot' ? '' : itemKey[i]) + '</dt>',
                        dd = $('<dd>'),
                        str = '';

                    for (var j = 0, jLen = city[group][itemKey[i]].length; j < jLen; j++) {
                        str += '<span>' + city[group][itemKey[i]][j] + '</span>';
                    }

                    dd.append(str);
                    dl.append(dt).append(dd);
                    itembox.append(dl);
                }
                $('.kucity_body').append(itembox);
                this.container.find('.hot').addClass('active');
            }
            this.isContainerExit = true;
        },
        //创建搜索结果列表
        creatResult: function(re, value) {
            var result = re.result,
                len = result.length,
                str = '';
            if (!!len) {
                for (var i = 0; i < len; i++) {
                    str += '<li><span class="name">' + result[i].cityName + '</span><span class="letter">' + result[i].py + '</span></li>';
                }
                this.container.find('.result').html('').html(str).find('li').eq(0).addClass('active');
            } else {
                this.container.find('.result').html('<li>没有找到<span class="noresult">' + value + '</span>相关信息</li>');
            }
        },
        //列表切换
        tabChange: function() {
            $('.kucity_nav').on('click', 'li', function(e) {
                var current = $(e.target),
                    index = current.index();

                current.addClass('active').siblings().removeClass('active');
                $('.kucity_item').eq(index).addClass('active').siblings().removeClass('active');
                $(' .kucity_body').scrollTop(0);

            });
        },
        //城市选择
        citySelect: function() {
            var self = this;
            $('.kucity_item dd').on('click', 'span', function(e) {
                self.target.val(($(e.target).text()));
                self.container.hide();

                //监听城市名输入栏, 宽度随着城市名字长度而变化
                function cityIptWidth() {
                    cityName = $("#citySelect").val();
                    cityUrlCode = "%E5%B9%BF%E5%B7%9E";
                    var cityNameNum = cityName.length;
                    $("#citySelect").css("width", (cityNameNum * 18 + 30) + "px");
                }
                cityIptWidth();
                //切换城市后刷新天气信息及随机背景
                cityName = $("#citySelect").val();
                cityUrlCode = encodeURIComponent(cityName);
                getWeather();
                randomBgGrad();

            });
        },
        //上下键选择搜索结果
        keySelect: function() {
            var self = this;
            this.target.on('keydown', function(e) {
                var current = self.resultct.find('.active').index();
                if (current !== -1) {
                    switch (e.keyCode) {
                        //上
                        case 38:
                            keyActive(false);
                            break;
                            //下
                        case 40:
                            keyActive(true);
                            break;
                            //确定
                        case 13:
                            self.isKeyslect = false;
                            self.target.val(self.resultct.find('.active .name').text());
                            self.triggleShow('all');
                            self.target.blur();
                            break;
                        default:
                            self.isKeyslect = false;
                            break;
                    }

                    function keyActive(isInorder) {
                        var max = self.resultct.find('li').length - 1;
                        if (isInorder) {
                            current = current == max ? 0 : current + 1;
                        } else {
                            current = current === 0 ? max : current - 1;
                        }
                        self.resultct.find('li').eq(current).addClass('active').siblings().removeClass('active');
                        self.isKeyslect = true;
                    }
                }
            });
        },
        //搜索
        inputSearch: function() {
            var self = this;
            this.target.on('keyup', function(e) {
                if (!self.isKeyslect) {
                    self.throttle(search, this);
                }
            });
            // 输入框搜索
            function search(e) {
                var container = self.container;
                self.triggleShow(false);
                var value = $(this).val();
                if (value) {
                    var url = 'https://sjipiao.alitrip.com/city_search.do?_ksTS=1439362066383_11337&lines=10&_input_charset=utf-8&needProvince=true&q=' + value;
                    $.ajax({
                        url: url,
                        type: 'get',
                        dataType: 'jsonp'
                    }).done(function(re) {
                        self.creatResult(re, value);
                    });
                } else {
                    self.triggleShow(true);
                }
            }
        },
        //列表，结果，整体 显示切换
        triggleShow: function(open) {
            var container = this.container;
            if (open === 'all') {
                container.hide();
            } else if (open) {
                container.find('.citybox').show().end().find('.result').hide();
            } else {
                container.find('.citybox').hide().end().find('.result').show();
            }
        },
        //函数节流
        throttle: function(fn, context) {
            clearTimeout(fn.tId);
            fn.tId = setTimeout(function() {
                fn.call(context);
            }, 100);
        },
        //阻止事件冒泡
        stopPropagation: function() {
            var self = this;
            //阻止事件冒泡
            this.container.on('click', stopPropagation);
            this.target.on('click', stopPropagation);
            //页面点击 隐藏
            $(document).on('click', function() {
                self.container.hide();
            });

            function stopPropagation(e) {
                e.stopPropagation();
            }
        }
    };

    var kucity = null;
    $.fn.kuCity = function(options) {
        var target = $(this);
        target.on('focus', function(e) {
            var top = $(this).offset().top + $(this).outerHeight(),
                left = $(this).offset().left;
            kucity = kucity ? kucity : new KuCity(target);
            kucity.target = $(e.target);
            kucity.init();
            kucity.container.show().offset({
                'top': top + 7,
                'left': left
            });
            kucity.triggleShow(true);
            kucity.resultct.on('click', 'li', function() {
                kucity.target.val($(this).find('.name').text());
                kucity.triggleShow('all');
            });
        });
        return this;
    };
})(jQuery);

$(document).ready(function() {
    $('#citySelect').kuCity();
});
