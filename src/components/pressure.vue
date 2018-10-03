<template>
  <div>
    <label>Systolic:</label>
    <p>{{ systolic }}</p>  
    <label>Diastolic:</label>
    <p>{{ diastolic }}</p>
  </div>
</template>

<script>
export default {
  data() {
      return {
           systolic: '',
           diastolic: ''
      }
  },
  props: {
      pressure: Array
  },
  computed: {
      splitStr() {
          let pressureArr =  this.pressure.split('/');
          this.systolic = pressureArr[0];
          this.diastolic = pressureArr[1];
      }
  }
};
</script>

<style>

</style>