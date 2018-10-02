<template>
 <div>
    <div v-if="!verified" class="auth-user">
            <button class="weui-btn" type="primary" open-type="getUserInfo"  @getuserinfo="bindGetUserInfo"> Get Verified </button>  
    </div>
    
    <div v-else>
        <div v-if="!isEmpty(userInfo)" class="profile">
            <div class="profile-info">
              <div class="profile-img">
                  <open-data type="userAvatarUrl" ></open-data>
              </div>   
              <div  class="profile-name">
                 <open-data type="userNickName"></open-data>
              </div>      
              <div class="profile-gender">
                  <open-data type="userGender"></open-data>
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
    return {};
  },
  computed: {
    ...mapState("profile", ["verified", "userInfo"])
  },
  methods: {
    ...mapActions("profile", ["setUserInfo", "setVerification"]),
    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    },
    checkForAuthorization() {
      // let _this = this;
      // wx.getSetting({
      //   success: function(res) {
      //     if (res.authSetting["scope.userInfo"]) {
      //       wx.getUserInfo({
      //         success: function(res) {
      //           console.log("Authorized. getUserInfo can be directly called to retrieve profile");
      //           _this.setUserInfo(res.userInfo);
      //         }
      //       });
      //     }
      //   },
      //   fail: function(res) {
      //     console.log("Err: User has not been authorized");
      //   }
      // });
    },
    bindGetUserInfo: function(e) {
      let _this = this,
        tempToken,
        { encryptedData, iv } = e.mp.detail;
      try {
        tempToken = wx.getStorageSync("tempToken");
      } catch (e) {
        console.log("Get storage err: ", e);
      }
      if (encryptedData && iv) {
        wx.showLoading({
          title: "Loading",
          mask: true
        });
        wx.request({
          url: config.api.signup,
          data: {
            token: tempToken,
            encryptedData,
            iv
          },
          method: "POST",
          header: {
            "content-type": "application/json"
          },
          success: function(res) {
            try {
              wx.removeStorageSync("tempToken");
            } catch (e) {
              console.log("Remove Storage err: ", e);
            }
            wx.hideLoading();
            _this.setVerification(res.data.verified);
          },
          fail: function(error) {
            console.log("signup err", error);
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.auth-user {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}

.profile {
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

.profile-info {
  width: 50%;
  margin: 0 auto;
  text-align: center;
}
.profile .profile-info .profile-img {
  height: 148rpx;
  width: 148rpx;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
}
</style>