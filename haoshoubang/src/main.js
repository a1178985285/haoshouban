import Vue from 'vue'
import App from './App'
import '../static/weui/weui.css'
import '../static/liuui/liuui.css'
import apis from "./utils/apis"
import api from './utils/api'
var Fly=require("flyio/dist/npm/wx")
var fly=new Fly

var SERVER_URL = 'http://www.rayxlink.com:8888/api'

Vue.prototype.$http = api
Vue.prototype.$https=apis
Vue.prototype.$fly = fly
Vue.prototype.$base_url = SERVER_URL

Vue.config.productionTip = false
App.mpType = 'app'



const app = new Vue(App)
app.$mount()
