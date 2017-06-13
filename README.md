# WEATHER-FORECAST

A weather-forecast page using AJAX to fetch data from <a href="http://juhe.cn/">Juhe API</a>, in built with HTML5 geoLocation, <a href="http://lbsyun.baidu.com/">BaiDuMap API</a> and Lunar Date functions, etc, inspired by <a href = "https://www.freecodecamp.cn/challenges/show-the-local-weather" target="_blank">Task on FreeCodeCamp</a>.<br>

Main Functions/Features:

1. When opening this page, a confirm request for html5 geoLocation will be popped up, once confirmed, the browser will try to recognize your current position and get your position.coords.latitude and position.coords.longitude, etc, which will be handled by BaiDuMap API(GeoCoder) to get the cityName by decoding, afterwards the cityName will be passed as a parameter to AJAX query string; 

2. In case automatic geoLocation fails, you can also manually click the citySelect box to choose a city name you want among cities name list(this list includes top search cities and most cities in Mainland China indexed by alphabetical order);

3. The weather info would be fetched in JSON format, which will be splited and joined as html snippets and appended to DOM, moreover, different weather logos will also be added as background to weather panels according to weather description;

4. There is a timer above weather panels showing current time in your timezone, by default the weather info will be automatically requested and refreshed at 6:00 and 18:00, you can also click the button on the right side to renew weather info immediately at any time; Another interactive feature is the random changes of gradual background colors when you manually select a cityName or refresh city info;

5. Lunar date today is also shown in the first weather panel, which is transferred from Date object by lunarDate.js;

6. The demo has been applied with BootStrap and CSS3 media query to achieve responsive designs in most platforms and different size of screens, which have been simulated and tested in Chrome developer tools;

This Demo is very simple since it's one of my practicing projects when learning Front-end Developments from scratch, it can be viewed @ <a href = "https://www.mike652638.com/demo/weather.html">My Website Demo Page-Weather</a>. Any issues or bugs report are always welcome, helpful commits will be much appreciated :)

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

# 天气预报

这个天气预报小页面主要运用AJAX技术从<a href="http://juhe.cn/">聚合数据</a>请求天气信息, 同时应用了HTML5的geoLocation定位功能, 百度地图API以及农历转换等函数, 基于<a href = "https://www.freecodecamp.cn/challenges/show-the-local-weather" target="_blank">FreeCodeCamp上的实践任务</a>完成。

主要功能/特色:

1. 打开此网页时会弹出定位请求的确认窗口(因设置问题, 某些浏览器可能默认拦截该请求), 点击确定共享位置信息后该程序会尝试定位并得到你当前所在位置的经纬度等信息, 随后这些信息会被传递给百度地图的API并通过反解析得到城市名称, 城市名又会以URL参数的形式传递给AJAX从聚合数据请求相应城市的天气信息;

2. 如果自动定位失败, 你还可以点击城市名窗口, 在弹出的城市名列表中选择你需要查询的城市(该列表包含国内热搜城市和字母索引的中国大陆主要城市);

3. 通过AJAX从聚合数据请求返回的天气信息初始为JSON格式, 通过字符串的提取和拼接被添加到页面相应的DOM节点, 另外, 根据天气状况的不同, 相应的天气图标也会分别被添加到天气信息栏;

4. 在天气信息栏的上方存在一个小窗口显示当前时间, 默认情况下该页面会在每天的6:00和18:00自动发送AJAX请求并更新天气信息, 你也可以随时手动点击时间窗口右侧的"立即更新"按钮进行刷新;另一个交互小特性是当你手动切换城市名或刷新天气信息后, 页面的背景色会被替换成一种随机的渐变色;

5. 在当天的天气信息栏中, 还会显示农历日期, 这是通过lunarDate.js从Date对象转换得到的;

6. 这个小页面运用了BootStrap框架和CSS的媒体查询, 尽可能做到对不同平台不同尺寸屏幕的兼容(已在Chrome浏览器的开发者模式中模拟测试); 

这个小页面是我自学前端时实践的一个小项目, 实现起来并不难, 您可以进入<a target="_blank" href = "https://www.mike652638.com/demo/weather.html">我的网站DEMO展示页-天气预报</a>查看在线效果, 随时欢迎您提出任何问题, 建议或反馈 :) <br>

<a target="_blank" href = "https://www.mike652638.com/demo/weather.html"><img src="https://www.mike652638.com/demo/weather/scrShts/weatherScrSht-pc.png" alt="tick-tack-toe-screenshot" /></a>
