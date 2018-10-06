<template>
    <div class="pg-container">
       <p class="pg-top-title">GET YOUR </p>
       <p class="pg-title">Latest Reports</p>
       <div class="pg-date-picker">
         <div class="pg-date-picker-item">
             <p class="pg-date-picker-text">From</p>
              <picker mode="date" value="date" id="start"  @change="bindDateChange">
                  <div class="pg-date-picker-input">{{date.start}}</div>
              </picker>
         </div>
          <div class="pg-date-picker-item">
             <p class="pg-date-picker-text">To</p>
              <picker mode="date" id="end" value="date" @change="bindDateChange">
              <div class="pg-date-picker-input">{{date.end}}</div>
            </picker>
         </div>
       </div>
        <div class="pg-line"></div>
       <button class="btn-default" type="submit" @click="bindSubmit">Submit</button>
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
      this.date.end = newDate.toISOString().split("T")[0];
      let startDate = newDate.setDate(newDate.getDate() - 7);
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
        wx.hideLoading();
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
    bindSubmit() {
      console.log("submitted");
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
          wx.hideLoading();
          console.log("records err", err);
        }
      });
    }
  }
};
</script>

<style scoped>

.pg-container {
   padding: 50px 0;
}

.pg-top-title {
  text-align: center;
  font-weight: 700;
}
.pg-title {
  color: #6190c6;
  margin-bottom: 20px;
  text-align: center
}
.pg-date-picker {
   margin: 0 20px;
}

.pg-date-picker .pg-date-picker-item:first-child {
  padding-right: 1.5%;
}

.pg-date-picker .pg-date-picker-item:last-child {
  padding-left: 1.5%;
}
.pg-date-picker-item {
   display: inline-block;
   width: 47%;
   content: border-box;
}
.pg-date-picker-text {
   padding-left: 4px;
}
.pg-date-picker-input {
  border:47%;
  padding: 4px 8px;
  border: 0.5px solid #ccc;
  border-radius:4px;
}

.btn-default {
  letter-spacing: 1px;
  padding: 8px 15px;
  background-color: #6190c6;
  color: #fff;
  line-height: 1.5;
  border-radius: 30px;
  font-size: 18px;
  width: 200px;
  text-align: center;
  position:relative;
  top:-20px;
}

.pg-line {
  border-top:0.5px solid #ccc;
  margin-top:40px;
}
.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
</style>
