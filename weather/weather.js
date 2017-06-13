$(document).ready(function() {
    var currentTime,
        hourNow,
        minNow,
        secNow,
        weatherRep;
    var cityName = "广州",
        cityUrlCode = "%E5%B9%BF%E5%B7%9E";

    $('.tooltip-show').tooltip('show');
    //如果显示了BS tooltip, 则给其留一行位置, 否则下方整体上移
    $("#citySelect").hover(function() {
        $(".renewNote").css("margin-top", "40px");
    }, function() {
        $(".renewNote").css("margin-top", "20px");
    });

    //监听城市名输入栏, 宽度随着城市名字长度而变化
    function cityIptWidth() {
        cityName = $("#citySelect").val();
        cityUrlCode = "%E5%B9%BF%E5%B7%9E";
        var cityNameNum = cityName.length;
        $("#citySelect").css("width", (cityNameNum * 18 + 30) + "px");
    }
    cityIptWidth();

    $("#citySelect").on("input", function() {
        cityIptWidth();
    });

    /**手机端点击城市输入框时会弹出手机自带键盘,
    遮挡了城市选择列表, 用户体验不好, 通过以下方式屏蔽以下**/
    function preventKeyBoard() {
        $("#citySelect").focus(function() {
            document.activeElement.blur();
        });
    }
    preventKeyBoard();

    function getTime() {
        var timeObj = new Date(),
            timeNow;
        hourNow = timeObj.getHours();
        minNow = timeObj.getMinutes();
        secNow = timeObj.getSeconds();

        if (minNow < 10) {
            minNow = "0" + minNow;
        }
        if (secNow < 10) {
            secNow = "0" + secNow;
        }
        $("#hourNow").html(hourNow);
        $("#minNow").html(minNow);
        $("#secNow").html(secNow);
    }
    setInterval(getTime, 1000);

    /**结合HTML5的geolocation功能进行定位, 同时结合百度地图API逆向解析获得城市名**/
    function getCity() {
        // 检测浏览器是否支持地理定位功能
        if (navigator.geolocation) {
            /** 加入加入一个"自动定位中..." 的提示 **/
            $("#citySelect").val("自动定位中...");
            cityIptWidth();
            setTimeout(function() {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            }, 1500);
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
                /**修正自己电脑因VPN翻墙导致识别城市为Santa Clara的问题**/
                if (cityName === "Santa Clara") {
                    cityName = "广州";
                }
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
            $("#citySelect").val("定位失败...");
            cityIptWidth();
        }
    }
    getCity();

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
                            imgEle.src = "weather/img/sunnyToCloudy.png";
                            break;
                        case /多云转晴/.test(weDay):
                            imgEle.src = "weather/img/sunnyToCloudy.png";
                            break;
                        case /暴雨/.test(weDay):
                            imgEle.src = "weather/img/heavyRain.png";
                            break;
                        case /大雨/.test(weDay):
                            imgEle.src = "weather/img/heavyRain.png";
                            break;
                        case /雷阵雨/.test(weDay):
                            imgEle.src = "weather/img/thunderRain.png";
                            break;
                        case /阵雨/.test(weDay):
                            imgEle.src = "weather/img/shower.png";
                            break;
                        case /雷/.test(weDay):
                            imgEle.src = "weather/img/thunder.png";
                            break;
                        case /小雨/.test(weDay):
                            imgEle.src = "weather/img/lightRain.png";
                            break;
                        case /雨/.test(weDay):
                            imgEle.src = "weather/img/lightRain.png";
                            break;
                        case /冰雹/.test(weDay):
                            imgEle.src = "weather/img/hailNdRain.png";
                            break;
                        case /雨夹雪/.test(weDay):
                            imgEle.src = "weather/img/snowNdRain.png";
                            break;
                        case /大雪/.test(weDay):
                            imgEle.src = "weather/img/heavySnow.png";
                            break;
                        case /小雪/.test(weDay):
                            imgEle.src = "weather/img/lightSnow.png";
                            break;
                        case /阴/.test(weDay):
                            imgEle.src = "weather/img/cloudy.png";
                            break;
                        case /雾/.test(weDay):
                            imgEle.src = "weather/img/fog.png";
                            break;
                        case /霾/.test(weDay):
                            imgEle.src = "weather/img/haze.png";
                            break;
                        case /晴/.test(weDay):
                            imgEle.src = "weather/img/sunny.png";
                            break;
                        default:
                            imgEle.src = "weather/img/sunnyToCloudy.png";
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
    getWeather();

    //随机背景
    function randomBgGrad() {
        var randNum = Math.floor(Math.random() * 7);
        $("#bgImg").attr("class", "bgImg bgGrad" + randNum);
    }

    //背景高度自适应
    function chgBgHt() {
        //小技巧: 背景高度等于最后一个元素距离页面顶部高度+最后一个元素自身的高度页底空白高度/文档窗口高度(取其大者)
        var btmToTop = $("#showWeather6").offset().top + 230;
        var winHt = $(window).height();
        if (btmToTop >= winHt) {
            $("#bgImg").css("height", btmToTop);
        } else {
            $("#bgImg").css("height", winHt);
        }
    }
    chgBgHt();
    $(window).resize(function() {
        chgBgHt();
        $('.tooltip-show').tooltip('show');
        $(".renewNote").css("margin-top", "40px");
    });

    /**每天固定时间6:00和18:00更新一次天气**/
    /**以下代码参考http://stackoverflow.com/questions/1217929/how-to-automatically-reload-a-web-page-at-a-certain-time**/
    function refreshAt(hours, minutes, seconds, funcs) {
        var now = new Date();
        var then = new Date();

        if (now.getHours() > hours ||
            (now.getHours() == hours && now.getMinutes() > minutes) ||
            now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() >= seconds) {
            then.setDate(now.getDate() + 1);
        }
        then.setHours(hours);
        then.setMinutes(minutes);
        then.setSeconds(seconds);

        var timeout = (then.getTime() - now.getTime());
        setTimeout(funcs, timeout);
    }
    refreshAt(6, 0, 0, getWeather);
    refreshAt(6, 0, 0, randomBgGrad);
    refreshAt(18, 0, 0, getWeather);
    refreshAt(18, 0, 0, randomBgGrad);

    //setInterval(getWeather, 21600000); 每隔6小时更新一次
    //setInterval(randomBgGrad, 21600000);
    $("#btn-getNew").click(function() {
        cityName = $("#citySelect").val();
        cityUrlCode = encodeURIComponent(cityName);
        getWeather();
        randomBgGrad();
        $("#renewInfo").css("display", "inline");
        setTimeout(function() {
            $("#renewInfo").css("display", "none");
        }, 2000);
    });
});
