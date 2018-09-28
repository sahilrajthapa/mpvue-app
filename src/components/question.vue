<template>
    <div>
        <text class="question-header">{{question.label}}</text>
         
        <!-- for text input --> 
        <view v-if="question.formType=='text'" >
        <view v-if="question.options.length!=0" class="weui-cell weui-cell_input">
           <label v-for="(item,index) in question.options" :key="index" class="weui-cell__bd">
              <text>{{item.label}}</text>
              <input class="weui-input" :name="item.label" placeholder="item.name" value=""/>
           </label>
        </view>
            <input v-else class="weui-input" v-model="inputValue" @change="inputChange"  :name="question.label" />       
        </view>

        <!-- for radio input -->
        <view v-else-if="question.formType=='radio'"> 
            <radio-group :name="question.label" @change="inputChange" >
                <view>
                    <label class="weui-cell weui-check__label" v-for="(item, index) in question.options" :key="index">
                        <radio class="weui-cell__ft weui-cell__ft_in-radio" :value="index"></radio>
                        <text class="weui-cell__bd">{{item.label}}</text>
                    </label>
                </view>
            </radio-group>
        </view> 

        <!-- for multiselect input -->
        <view v-else-if="question.formType=='multi-select'">   
            <checkbox-group :name="question.label">
                <view  v-for="(item, index) in question.options" :key="index">
                    <label class="weui-cell weui-check__label">
                        <checkbox :name="index" :value="index"/>
                        <view class="weui-cell__bd">{{item.label}}</view>              
                    </label>  
                    <textarea v-if="item.formType=='textbox'" :name="item.label" @change="textBoxChange"
                           />         
                </view>
            </checkbox-group>
        </view>
    </div>
</template>

<script>
export default {
  data:{
     textBoxValue:""
  },

  props: {
    question: Object,
    inputValue:String,
    inputChange:Function 
  },

  methods:{
      textBoxChange(e){
         this.textBoxValue=e.target.value
      }
  }
}
</script>

<style>
</style>