<template>
  <div class="container" @click="clickHandle('test click', $event)">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
  </div>
</template>

<script>
import card from '@/components/card'
import config from '../../config/config'
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      sid:"",
      jsCodeDone:false,
      userInfoDone:false,
      resData:{}
    }
  },

  components: {
    card
  },

  methods: {   
    ...mapActions('profile',[
       'setSid'
    ]),

    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },

    setUserInfo(){

    },
    getUserInfo () {
      var _this=this;
      // 调用登录接口
      wx.login({
        success: (res) => {
          if(res.code){
            //make api call in backend and getting sid
            wx.request({
                url: config.api.login,
                data: {
                    code: res.code
                },
                
                success: function(res) {
                    console.log("res",res.data);
                    _this.sid = res.data.sid;
                    _this.jsCodeDone = true;
                    _this.setSid(res.data.sid);
                    _this.jsCodeDone && _this.userInfoDone && !res.verified && _this.setUserInfo();
                },
                fail:function(error){
                    console.log("err",error)
                }
            });

            wx.getSetting({
              success: function (res) {
                if (res.authSetting['scope.userInfo']) { 
                  wx.getUserInfo({
                      success: function(res) {
                          console.log("res",res);
                          _this.userInfo      = res.userInfo;
                          _this.resData.encryptedData = res.encryptedData;
                          _this.resData.iv = res.iv;
                          _this.userInfoDone          = true;
                          _this.jsCodeDone && _this.userInfoDone && !res.verified && _this.setUserInfo();
                      },
                      fail: function(data) {
                          console.log("err in getting userinfo",data);
                      }
                  });
                }
              }
            })
          }
          
        }
      })
    },
    
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>