<template>
   
    <form class="container" @submit="onSubmit" report-submit="true">
            
    <div class="form-group">
        <label>Systolic Level:</label>
        <input type="number" class="form-control" v-model.number="systolic" placeholder="Systolic Level" @blur="validateSystolic(systolic)"/>
        <p v-if="!isEmptyString(errors.systolicErr)">{{errors.systolicErr}}</p>      
    </div>
    <div class="form-group">
        <label>Systolic Level:</label>
        <input type="number" class="form-control" v-model.number="diastolic" placeholder="Diastolic Level" @blur="validateDiastolic(diastolic)" />
        <p v-if="!isEmptyString(errors.diastolicErr)">{{errors.diastolicErr}}</p>
    </div>
    <div class="form-group">
        <label>Sugar Level:</label>
        <input type="number" class="form-control" v-model.number="sugarLevel" placeholder="Diastolic Level"  @blur="validateSugar(sugarLevel)" />
        <p v-if="!isEmptyString(errors.sugarLevelErr)">{{errors.sugarLevelErr}}</p>
    </div>
      <button formType="submit" :disabled="disableButton">Submit</button>
    </form>
</template>

<script>
import config from "../../config/config";
import { mapState } from "vuex";

export default {
  data() {
    return {
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
    onSubmit(e) {
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
.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.form-group p {
  color: red;
}
</style>
