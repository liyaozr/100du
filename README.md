#### 如何实现网站模块化布局

1.拿到设计稿以后先进行整站分析，确定网站整体架构，由哪几个部分组成，把大致的结构在html中写出来。

```html
<body>
	<div id="header"></div>
	<div id="nav"></div>
	<div id="search"></div>
	<div class="content">
		<div class="main"></div>
		<div class="side"></div>
	</div>
	<div id="footer"></div>
</body>
```
关于id与class的选择。像网站的头部、导航、页脚这些，一般是不会有重复的，这几个地方可以大胆的用id。

2.建立网站目录；创建及引入样式表，reset样式；引入相关的js文件，如jQuery等。把icon图标引入页面。

3.对着设计图，完善结构。

-  仔细观察结构相同或者相似的块，统一进行class命名

```html
<body>
    <div id="header"></div>
    <div id="nav"></div>
    <div id="search"></div>
    <div class="content">
        <div class="main">
            <div class="">
                <div class="section"></div>
                <div class="options"></div>
            </div>
            <div class="main-ad"></div>
        </div>
        <div class="side"></div>
    </div>
    <div id="footer"></div>
</body>
```
- 根据布局写公共样式

```css
/* public */
.clear{zoom: 1;}
.clear{content: '';display: block;}
.fl{float:left}
.fr{float:right}
```
- 把页面的结构写出来,两个大块之间，即使外部结构相似，也尽量分开命名，便于后期维护。

```html
<body>
    <div id="header"></div>
    <div id="nav"></div>
    <div id="search"></div>
    <div class="content">
        <div class="main">
            <div class="clear">
                <div class="section fl"></div>
                <div class="options fr"></div>
            </div>
            <div class="main-ad"></div>
            <div class="clear">
                <div class="section fl"></div>
                <div class="options fr"></div>
            </div>
            <div class="clear">
                <div class="section fl"></div>
                <div class="options fr"></div>
            </div>
            <div class="main-ad"></div>
            <div class="clear">
                <div class="section fl"></div>
                <div class="options fr"></div>
            </div>
            <div class="clear">
                <div class="section fl"></div>
                <div class="options fr"></div>
            </div>
        </div>
        <div class="side">
        	<div class="side-section"></div>
        	<div class="side-ad"></div>
        	<div class="side-ad"></div>
        	<div class="side-section"></div>
        	<div class="side-section"></div>
        	<div class="side-section"></div>
        	<div class="side-section"></div>
        	<div class="side-section"></div>
        </div>
    </div>
    <div id="footer"></div>
</body>
```

3.结构搭建好之后，开始完善样式

    这里要特别注意，以前写代码都是先把html内容写出来，然后再去写css布局。
    但是很多细节的东西在写css的时候会发现以之前所搭建的html结构根本无法实现，又必须的调整html结构，这样会很混乱。

**正确的做法应该是：html整体架构→css整体布局→细节**

**思想：找公共部分，先把公共样式提取出来，再写私有的。**

- 把页面中的渐变、圆角等很多内容都有的样式写出来

```css
/* 渐变 */
.gradient{
	background: linear-gradient(to bottom,#ffffff,#f8f8f8);
	-ms-filter:"progid:DXImageTransform.Microsoft.gradient (GradientType=0, startColorstr=#FFFFFF, endColorstr=#f8f8f8)";
	+background: #f9f9f9;
}
```

- 实现布局模块的样式公用化：刚开始可以先把所有布局样式写下来，然后再进行简写，熟练以后就知道哪里可以简写了。
- 大概布局搭建好以后，上到各个浏览器中看看有没有问题，有问题及时调整。
---
问题：IE7及以下margin-bottom失效

情况1：

```html
<div class="clear">
    <div class="section fl"></div>
    <div class="options fr"></div>
</div>
<div class="main-ad"><a href="#"><img src="img/ad/ad1.jpg"></a></div>
```
像这样一个结构，如果上下元素中间有margin值，那么margin-bottom最好是加在clear或者options上，如果加在section上在IE7下是无效的。

情况2：

```html
<div class="clear">
    <div class="section fl"></div>
<!--     <div class="options fr"></div> -->
</div>
<div class="main-ad"><a href="#"><img src="img/ad/ad1.jpg"></a></div>
```
拿掉options以后，IE7以下margin-bottom又失效了。----**浮动的div在遇到margin-bottom时会失效。**

解决方法：换成padding-bottom

---

- 精简布局样式
- 代码书写规范（如果公司有规范就用公司的）

4.细化css样式

这部分就是细节+细节+细节，尽量100%还原视觉稿。

tips：

- 关于文字垂直居中，line-height解决不了的情况下也可以采用padding，只要能到达效果就好
- 文字之间的距离，也可以采用word-spacing来解决（CSS 把“字（word）”定义为任何非空白符字符组成的串，也就是说“你好”这是一个word）
- 导航部分切图的时候一定要注意，有hover效果的面积是要大于没有hover效果的图片的。
- 切图小技巧：

    1.把hover效果打开

    2.图中虚线的部分其实就可以当成li的宽度了，因为空间是两边都有的，加起来其实就是第一个图片到第二个图片之间的距离，所以总宽度=图片宽度+两个图片之间的宽度

    ![切图小技巧](http://upload-images.jianshu.io/upload_images/4229306-694257c36bbaa131.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/500)

- transparent 在 IE6 中无效（用背景色）
- 写html和css的时候考虑一下js的部分，把结构和样式一次性写好了，否则到时候写js的时候还需要去改html和css。

- 做整站的时候需要特别注意的地方，对于布局中没有写定高的部分，做完之后务必要量一下，1个像素都不差，否则之后要再改就会很麻烦。。
- 页面结构相似的先把公共部分写出来，私有的再巧用命名空间。

-  一定要边写边测，并测试所有需要兼容的浏览器。
