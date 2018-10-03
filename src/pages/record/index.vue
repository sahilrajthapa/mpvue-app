<template>
    <div class="container">
       <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">start</div>
          </div>
          <div class="weui-cell__bd">
            <picker mode="date" value="date" id="start"  @change="bindDateChange">
              <div class="weui-input">{{date.start}}</div>
            </picker>
          </div>
        </div>
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">end</div>
          </div>
          <div class="weui-cell__bd">
            <picker mode="date" id="end" value="date" @change="bindDateChange">
              <div class="weui-input">{{date.end}}</div>
            </picker>
          </div>
        </div>
         
         <button class="weui-btn" type="primary" plain="true" @click="bindSubmit">Submit</button>
        <p>Your's latest record</p>
        <div v-for="record in userRecord" :key="record.id">
            <pressure :pressure="record.pressure"></pressure>
            <label>Sugar:</label>
            <p>{{record.sugar}}</p> 
        </div>

    </div>
</template>

<script>
import config from "../../config/config";
import { mapState, mapActions } from "vuex";
import pressure from "@/components/pressure";

export default {
  components: {
    pressure
  },
  data() {
    return {
      userRecord: [],
      date: {
        start: "",
        end: ""
      }
    };
  },
  computed: {
    ...mapState("profile", ["token"]),
    defaultDate() {
      let newDate = new Date();
      let startDate = newDate.setDate(newDate.getDate() - 7);
      this.date.end = newDate.toISOString().split("T")[0];
      this.date.start = new Date(startDate).toISOString().split("T")[0];
    }
  },
  onLoad() {
    let _this = this,
      token = _this.token;
    wx.showLoading({
      title: "Loading",
      mask: true
    });
    wx.request({
      url: `${config.api.sugPress}/getRecent`,
      header: {
        "x-access-token": token,
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res);
        wx.hideLoading();
        _this.userRecord = res.data.result;
      },
      fail: function(err) {
        console.log("records err", err);
      }
    });
  },
  methods: {
    bindDateChange(e) {
      if (e.mp.currentTarget.id === "start") {
        this.date.start = e.mp.detail.value;
      } else {
        this.date.end = e.mp.detail.value;
      }
    },
    bindSubmit(e) {
      e.preventDefault();
      let _this = this,
        { token, date } = _this;
      wx.showLoading({
        title: "Loading",
        mask: true
      });
      wx.request({
        url: `${config.api.sugPress}/${date.start}/${date.end}`,
        header: {
          "x-access-token": token,
          "content-type": "application/json"
        },
        success: function(res) {
          console.log(res);
          wx.hideLoading();
          _this.userRecord = res.data.result;
        },
        fail: function(err) {
          console.log("records err", err);
        }
      });
    }
  }
};
</script>

<style scoped>
.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
</style>
