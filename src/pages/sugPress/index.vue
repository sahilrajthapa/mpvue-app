<template>

    <div class="pg-container">
        
        <div class="pg-text">
          <span class="iconfont icon-post pg-font"></span>
          <p style="font-weight: 700">POST YOUR </p>
          <p class="pg-title">Blood & Sugar level</p>
        </div>
        <div class="pg-form">
          <form @submit="bindSubmit" report-submit="true">
          <div class="form-group">
              <label class="pglabel">Systolic Level</label>
              <input type="number" class="form-control" v-model.number="systolic" placeholder="eg: 90" @blur="validateSystolic(systolic)"/>
              <p v-if="!isEmptyString(errors.systolicErr)">{{errors.systolicErr}}</p>
          </div>
          <div class="form-group">
              <label class="pg-label">Diastolic Level</label>
              <input type="number" class="form-control" v-model.number="diastolic" placeholder="eg: 75" @blur="validateDiastolic(diastolic)" />
              <p v-if="!isEmptyString(errors.diastolicErr)">{{errors.diastolicErr}}</p>
          </div>
          <div class="form-group">
              <label class="pg-label">Sugar Level</label>
              <input type="number" class="form-control" v-model.number="sugarLevel" placeholder="eg: 55"  @blur="validateSugar(sugarLevel)" />
              <p v-if="!isEmptyString(errors.sugarLevelErr)">{{errors.sugarLevelErr}}</p>
          </div>
            <button formType="submit" :disabled="disableButton" class="btn-default"><span class="iconfont icon-submit" style="margin-right: 7px"></span>Submit</button>
        </form>
        </div>

    </div>

</template>

<script>
import config from "../../config/config";
import { mapState } from "vuex";

export default {
  data() {
    return {
      isActive: false,
      isFocus: false,
      systolic: "",
      diastolic: "",
      sugarLevel: "",
      errors: {
        systolicErr: "",
        diastolicErr: "",
        sugarLevelErr: ""
      }
    };
  },
  computed: {
    ...mapState("profile", ["token"]),
    disableButton() {
      if (
        this.systolic === "" ||
        this.diastolic === "" ||
        this.sugarLevel === ""
      ) {
        return true;
      } else if (
        this.errors.systolicErr !== "" ||
        this.errors.diastolicErr !== "" ||
        this.errors.sugarLevelErr !== ""
      ) {
        return true;
      } else {
        return false;
      }
    }
  },

  methods: {
    isEmptyString(str) {
      return str.trim().length === 0;
    },
    validateSystolic(value) {
      console.log(this)
      this.errors.systolicErr = "";
      let condition = value >= 40 && value <= 100;
      if (value === "") {
        this.errors.systolicErr = "Enter a number";
        return;
      }
      if (isNaN(parseFloat(value))) {
        this.errors.systolicErr = "Enter a valid Number";
        return;
      }

      if (!condition) {
        this.errors.systolicErr = "Numbers should be between 40 and 100";
        return;
      }
    },
    validateDiastolic(value) {
      console.log("validate");
      this.errors.diastolicErr = "";
      let condition = value >= 40 && value <= 100;
      if (value === "") {
        this.errors.diastolicErr = "Enter a number";
        return;
      }
      if (isNaN(parseFloat(value))) {
        this.errors.diastolicErr = "Enter a valid Number";
        return;
      }

      if (!condition) {
        this.errors.diastolicErr = "Numbers should be between 40 and 100";
        return;
      }
    },
    validateSugar(value) {
      this.errors.sugarLevelErr = "";
      let condition = value >= 40 && value <= 100;
      if (value === "") {
        this.errors.sugarLevelErr = "Enter a number";
        return;
      }
      if (isNaN(parseFloat(value))) {
        this.errors.sugarLevelErr = "Enter a valid Number";
        return;
      }

      if (!condition) {
        this.errors.sugarLevelErr = "Numbers should be between 40 and 100";
        return;
      }
    },
    bindSubmit(e) {
      e.preventDefault();
      let _this = this,
        { systolic, diastolic, sugarLevel, token } = _this,
        pressure = `${systolic}/${diastolic}`;
      wx.showLoading({
        title: "Loading",
        mask: true
      });
      wx.request({
        url: config.api.sugPress,
        data: {
          token,
          sugar: sugarLevel,
          pressure
        },
        method: "POST",
        header: {
          "content-type": "application/json"
        },
        success: function(res) {
          console.log("pressure res", res);
          wx.hideLoading();
          _this.systolic = "";
          _this.diastolic = "";
          _this.sugarLevel = "";
          wx.navigateTo({
            url: "/pages/record/main"
          });
        },
        fail: function(error) {
          console.log("err", error);
        }
      });
    }
  }
};
</script>

<style scoped>
.pg-container {
  padding: 70px 0;
}
.pg-text {
  width: 225px;
  margin: 0 auto;
  text-align: center;
}
.pg-font {
  font-size: 48px
}
.pg-title {
  color: #6190c6;
  margin-bottom: 40px;
}

.pg-form {
  width: 280px;
  margin: 0 auto;
}


.form-control {
  display: block;
  border-bottom: 0.5px solid #ccc; 
  padding-bottom: 2px
}

.form-group {
   margin-top: 12px
}
.form-group p {
  margin-top: 2px;
  color: red;
}

.btn-default {
  letter-spacing: 1px;
  padding: 8px 15px;
  background-color: #6190c6;
  color: #fff;
  line-height: 1.5;
  border-radius: 30px;
  font-size: 18px;
  margin-top: 50px;
  width: 225px;
  text-align: center;
}
.btn-default[disabled] {
  background-color: #76aff0;
  color: #fff;
}
</style>
