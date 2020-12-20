# haoshoubang

> A Mpvue project

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



1、未注册用户进小程序不需要自动签到  √
2、订单界面应该显示订单，点击接单时提示需要先签约
3、签约的签字区域写错字点击清除后清除不干净  √
4、拍摄身份证没有核验，随便拍一张就可以上传
5、银行卡上传界面提示还是提示用于全国公民身份查询 √
6、签约时填写的地址长度需要有限制，至少十个字 ，现在填两个字也能提交。
7、注册时填写完信息一直提示请填写完整，试了半天 性别必须输入男的才能通过 √
8、注册登陆以后就看不见首页的酒店订单了 √
9、积分兑换规则不对，积分余额不够没有限制，充值卡应该有两个链接，50和100面值，运营商缺少中国电信的选项，手机号随便输入数字就可以提交，没有核查手机号位数。兑换实物没有要求填写电话，收件人和地址没有字数限制，随便输入几个字就可以提交。兑换后没有兑换成功/不成功的提示。兑换过的记录在哪里查询？
10、好手帮介绍主页最上方的黄色背景和文字需要美化一下，标题处为：好手帮-服务业蓝领用工服务平台
11、培训界面无法测试，需要确认一下上传视频是否有视频长度时间要求 √
12、首页自动切换的页面配酒店介绍图片，不要用这种不相关的图片 √
13、首页切换的企业主页需要添加一个页面  √
14、订单点击查看详情页中没有接单按钮必须要返回去接单，订单详情页中没有显示本次订单信息，图片需要上传多张自动切换，每张可以点开。
15、点击接单按钮点不动  √

