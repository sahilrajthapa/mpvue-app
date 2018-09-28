<!-- <template>
    <div>
      
        <div v-if="!isEmpty(userInfo)">
           <div class="user-profile-wrap">
                <div class="user-profile">
                  <img :src="userInfo.avatarUrl" alt="Profile">
                  <p>NickName: {{userInfo.nickName}}</p>
                  <p>Gender: {{userInfo.gender == 1 ? 'Male' : ''}}{{userInfo.gender == 0 ? 'Female' : ''}}</p>
                  <p>City: {{userInfo.city}}</p>
                </div>             
           </div>           
        </div>       
    </div>
</template> -->

<template>
 <div>
    <div v-if="!verified" class="auth-user">
            <button class="weui-btn" type="primary" open-type="getUserInfo"  @getuserinfo="bindGetUserInfo"> Get Verified </button>  
    </div>
    
    <div v-else>
        <div v-if="!isEmpty(userInfo)" class="profile">
            <div class="profile-info">
              <img @click="toLogin" :src="userInfo.avatarUrl" alt="">
              <div @click="toLogin">
                <p>{{userInfo.nickName}}</p>
                <p>{{userInfo.gender == 1 ? 'Male' : ''}}{{userInfo.gender == 0 ? 'Female' : ''}}</p>
              </div>
            </div>
            <div class="iconlist">
              <div v-for="(item, index) in listData" :key="index">
                <span class="iconfont" :class="item.icon"></span>
                <span>{{item.title}}</span>
              </div>
            </div>
        </div>
    </div>  
 </div>
 
</template>

<script>
import config from "../../config/config";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      listData: [
        {
          title: "我的订单", // profile Order
          icon: "icon-unie64a",
          url: ""
        },
        {
          title: "优惠券", // Coupon
          icon: "icon-youhuiquan",
          url: ""
        },
        {
          title: "我的足迹", // profile footprint
          icon: "icon-zuji",
          url: ""
        },
        {
          title: "我的收藏", // profile Collection
          icon: "icon-shoucang",
          url: "/pages/collectlist/main"
        },
        {
          title: "地址管理", // Address management
          icon: "icon-dizhiguanli",
          url: "/pages/address/main"
        },
        {
          title: "联系客服", // Contact Customer Service
          icon: "icon-lianxikefu",
          url: ""
        },
        {
          title: "帮助中心", // Help center
          icon: "icon-bangzhuzhongxin",
          url: ""
        },
        {
          title: "意见反馈", //Feedback
          icon: "icon-yijianfankui",
          url: "/pages/feedback/main"
        }
      ]
    };
  },
  computed: {
    ...mapState("profile", ["sid", "verified", "userInfo"])
  },
  methods: {
    ...mapActions("profile", ["setUserInfo", "setVerification"]),
    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    },
    checkForAuthorization() {
      let _this = this;
      // Check if it is authorized
      wx.getSetting({
        success: function(res) {
          if (res.authSetting["scope.userInfo"]) {
            // Authorized. "getUserInfo" can be directly called to retrieve profile
            wx.getUserInfo({
              success: function(res) {
                console.log('get userinfo');
                _this.setUserInfo(res.userInfo);       
              }
            });
          }
        },
        fail: function(res) {
          console.log("Err: User has not been authorized");
        }
      });
    },
    bindGetUserInfo: function(e) {
      let _this = this;
      let sid = _this.sid;
      if (e.mp.detail) {
        let { encryptedData, iv } = e.mp.detail;
        wx.request({
          url: config.api.signup,
          data: {
            sid,
            encryptedData,
            iv
          },
          method: "POST",
          header: {
            "content-type": "application/json" // 默认值
          },
          success: function(res) {
            console.log("sign up res", res.data);
             if (!_this.verified) {
                  _this.setVerification(!_this.verified);
                }
            _this.checkForAuthorization();
          },
          fail: function(error) {
            console.log("bind user err", error);
          }
        });
      }
    }
  },
   created() {
     console.log('profile created');
    this.checkForAuthorization();
  },
};
</script>

<style scoped>
.auth-user {
  position: absolute;;
  transform:translate(-50%, -50%);
  left:50%;
  top:50%;
}

.profile .profile-info {
  width: 100%;
  height: 280rpx;
  display: flex;
  align-items: center;
  background: #fff;
  padding: 0 30rpx;
  box-sizing: border-box;
  border-top: 1rpx solid rgba(0, 0, 0, 0.15);
  margin-bottom: 25rpx;
}
.profile .profile-info img {
  height: 148rpx;
  width: 148rpx;
  border-radius: 50%;
  margin: 0;
}
.profile .profile-info div {
  margin-left: 30rpx;
}
.profile .profile-info div p {
  color: #333;
  font-size: 30rpx;
  margin-bottom: 10rpx;
}
.profile .profile-info div p:nth-child(2) {
  font-size: 28rpx;
}
.profile .iconlist {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.profile .iconlist div {
  width: 32%;
  padding: 50rpx 0;
  text-align: center;
  margin-right: 2%;
  margin-bottom: 2%;
  background: #fff;
  box-sizing: border-box;
}
.profile .iconlist div span {
  display: block;
}
.profile .iconlist div span:nth-child(1) {
  margin-bottom: 10rpx;
}
.profile .iconlist div:nth-child(3n + 3) {
  border-right: none;
  margin-right: 0;
}
.profile .iconlist div:nth-last-child(1) {
  border-bottom: none;
  margin-bottom: 0;
}
.profile .iconlist div:nth-last-child(2) {
  border-bottom: none;
  margin-bottom: 0;
}
</style>