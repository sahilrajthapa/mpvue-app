<template>
  <div class="container">
     <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in banner " :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.imageUrl" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="btn-wrap">
      <a href="/pages/sugPress/main" class="btn-default"> + Check Blood</a>
      <a href="/pages/record/main" class="btn-default"> + Get Report </a>
    </div>
  </div>
</template>

<script>
import card from "@/components/card";
import config from "../../config/config";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      banner: [
        {
          id: 1,
          imageUrl:
            "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
        },
        {
          id: 2,
          imageUrl:
            "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg"
        },
        {
          id: 3,
          imageUrl:
            "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg"
        }
      ],
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
                    console.log("Set Storage err: ", e);
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
  }
};
</script>

<style scoped>
.btn-wrap {
   margin: 50px 0
}
.container {
  padding: 0;
}
.swiper {
  width: 100%;
  height: 225px;
}

.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-item {
  width: 100%;
  height: 100%;
}
.slide-image {
  width: 100%;
  height: 100%;
}

.btn-default {
  letter-spacing: 1px;
  padding: 8px 16px;
  background-color: #6190c6;
  color: #fff;
  line-height: 1.5;
  border-radius: 30px;
  font-size: 18px;
  margin-bottom: 20px;
  width: 145px;
  text-align: center
}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 64px;
  height: 64px;
  margin: 10px;
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
