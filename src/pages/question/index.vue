<template>
  <div class="page">
    <view class="page__bd page__bd_spacing" v-if="questions.length>0">
      <view class="weui-panel" v-for="question in questions">
        <navigator  href="/pages/singleQuest/main" @click="selectQuestion(question)" 
           class="weui-media-box weui-media-box_appmsg"
           hover-class="weui-cell_active">
          {{question.type}}
        </navigator>
      </view>
    </view>  
  </div>    
</template>

<script>
import { mapState, mapActions } from 'vuex'
 
export default {
  components: {
  
  },  
  computed:{
    ...mapState('question',{
      questions:state=>state.questions
    })
  },

  data () {
    return {
      logs: []
    }
  },  

  methods:{
    ...mapActions('question',[
      'getAllQuestions',
      'selectQuestion'
    ]),
   
    formSubmit(e){
      
    },
    inputChange(e){

    },
    sliderChange(e){

    },
    async getQuestions(){
      await this.getAllQuestions();
      // this.$store.dispatch('getAllQuestions')  
    }
  },

  mounted() {
     this.getQuestions();        
  }
}
</script>