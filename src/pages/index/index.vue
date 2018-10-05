<template>
  <div class="container">
    <swiper/>
    <a href="/pages/sugPress/main" class="counter">Check your blood level</a>
    <a href="/pages/record/main" class="counter">Get your latest report </a>
    
  </div>
</template>

<script>
import card from "@/components/card";
import swiper from "@/components/swiper"
import config from "../../config/config";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      motto: "Hello World",
      userInfo: {},
      sid: "",
      jsCodeDone: false,
      userInfoDone: false,
      resData: {}
    };
  },

  components: {
    card,
    swiper
  },

  methods: {
    ...mapActions("profile", ["setToken", "setVerification"]),

    bindViewTap() {
      const url = "../logs/main";
      wx.navigateTo({ url });
    },

    setUserInfo() {},
    getUserInfo() {
      let _this = this;
      wx.login({
        success: res => {
          if (res.code) {
            //make api call in backend and getting sid
            wx.request({
              url: config.api.login,
              data: {
                code: res.code
              },

              success: function(res) {
                console.log("login request: ", res);
                if (res.data.token) {
                  _this.setToken(res.data.token);
                }
                if (res.data.tempToken) {
                  try {
                    wx.setStorageSync("tempToken", res.data.tempToken);
                  } catch (e) {
                    console.log('Set Storage err: ', e)
                  }
                }
                _this.setVerification(res.data.verified);
              },
              fail: function(error) {
                console.log("err", error);
              }
            });
          }
        }
      });
    },

    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    }
  },

  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
  },
  onUnload() {
    this.motto = "";
    console.log("unloaded", this);
  },
  onHide() {
    console.log("onHide", this);
    this.motto = "";
  }
};
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