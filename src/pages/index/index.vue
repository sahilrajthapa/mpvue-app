<template>
  <div class="container">
    <a href="/pages/sugPress/main" class="counter">Check your blood level</a>
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
     <text>{{motto}}</text>
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
  </div>
</template>

<script>
import card from "@/components/card";
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
    card
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