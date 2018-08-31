<template>
  <div class="page">
   <view v-if="currentQuestion=='core'">
     {{coreCount+1 + " out of "+coreQuestions.length}}
   </view>
  
  <form @submit="nextQuestion">
     
    <question :question="question" :inputValue="inputValue" :inputChange="inputChange" />
    <button 
        form-type="submit"
    >
      {{(finishIntro||finishCore)?'Submit':'Next'}}
    </button>
  </form>  
  </div>    
</template>

<script>
 import question from "@/components/question"
 import {mapGetters,mapActions,mapState} from 'vuex'
 import config from '../../config/config'

 export default{ 
    components:{
      question
    },
    
    computed:{
        ...mapState('question',[
        'selectedQuestion',
        'introQuestions',
        'coreQuestions',        
        ]),

        ...mapState('profile',[
          'sid'
        ]),

        ...mapState('answer',[
          'answer'
        ]),

        ...mapGetters('question',[
        'hasIntroQuestion',
        'getIntroQuestionById',
        'getCoreQuestionById'
        ]),
    },

    data:{
       question:{},
       introCount:0,
       coreCount:0,
       finishIntro:false,
       finishCore:false,
       currentQuestion:"",
       inputValue:"",
       
    },

    methods:{
      ...mapActions('answer',[        
        'setUpAnswer',
        'pushIntro',
        'pushCore',
      ]),
        
      setAnswer(value){

         let question=this.question;


         let noOptionId;          
         if (question.formType == "text") {
           noOptionId = true
         }
         
        let subanswer=[];

        //setting answer logic for text and radio button 
        if(question.formType=="text"||question.formType=="radio"){
          subanswer=[{
             //if formtype text then only opton id is needed
            "optionId":(noOptionId)?"":question.options[this.inputValue]._id,     
        
             //if formtype text then value is set to the form bind value else option label                
             "value": (noOptionId) ? this.inputValue : question.options[this.inputValue].label      
         }]
        }
        //setting answer logic for multiselect answer
        else if(question.formType=="multi-select"){
            this.inputValue.map((key,index)=>{
               subanswer.push({
                 "optionId":question.options[key]._id,
                 "value":(question.options[key].formType=="checkbox")?
                            question.options[key].label:value[question.options[key].label]
               })
            })
        }       
        
        var answer={
           questionId:question._id,
           label:question.label,
           answer:subanswer
        }
        
        //setting value of input to "" to avoid value of previous form to become initia value of current
        this.inputValue=""

        if(this.currentQuestion=="intro"){
           this.pushIntro(answer);
        } 
        else if(this.currentQuestion=="core"){
          this.pushCore(answer);
          
          if(this.finishCore){
            this.confirmFinalSubmit((confirm,cancel)=>{
               if(confirm){
                  this.sendAnswerToApi();
               }
               else if(cancel){
                  wx.navigate("/pages/question/main")
               }
            });   
          }
        }      
      }, 

      confirmFinalSubmit(cb){
        wx.showModal({
          title: 'Submit Answer',
          content: 'Do you want to submit your answer',
          success: function (res) {
            if(res.confirm) {
               cb(res.confirm,null);
            }           
            else if (res.cancel) {
              cb(null,res.cancel)
            }
          }
        })
      },

      sendAnswerToApi(){
        wx.request({
          method: "POST",
          url: config.api.answer,
          data: {
           answers: this.answer
          },
          success: function (res) {
             if(res.data.success){
                wx.showToast({
                    title: 'Answer Submited Successfully',
                    icon: 'success',
                    duration: 2000
                })
              }
              else{
                 wx.showToast({
                  title: 'Answer Submission Failed',
                  icon: 'error'
                })
              }
           
          },
          fail: function (err) {
            wx.showToast({
                  title: 'Answer Submission Failed',
                  icon: 'error'
            })
          }
        })
      },
    
      inputChange(e){
        this.inputValue=e.target.value
      },
      
      nextQuestion(e){        
        //separating the form value from key value pair of form
        console.log("E",e.target.value);
        this.inputValue=e.target.value[this.question.label]

        this.setAnswer(e.target.value)
        if(this.currentQuestion=="intro"){
          //push intro answer  
          if(this.finishIntro){
            return this.setCoreQuestion();
          }
          this.introCount=this.introCount+1
          this.setIntroQuestion();
        }              
        else{    
          if(!this.finishCore){      
          this.coreCount=this.coreCount+1;
          this.setCoreQuestion();
          }
        }
      },

      setIntroQuestion(){
         if(this.introCount==0){
            this.currentQuestion="intro"
         }
         this.question=this.getIntroQuestionById(this.introCount)
         if(this.introCount+1>=this.introQuestions.length){
             this.finishIntro=true;
         }
      },

      setCoreQuestion(){
         if(this.coreCount==0){
            this.currentQuestion="core"
         } 
         this.question=this.getCoreQuestionById(this.coreCount);
         if(this.coreCount+1>=this.coreQuestions.length){
             this.finishCore=true;
         }
      },

      setQuestion(){
         if(this.hasIntroQuestion&&!this.finishIntro){
            this.setIntroQuestion()
         }
         else {
            this.setCoreQuestion()
         }
      }
    },

    mounted(){

        this.introCount=0;
        this.coreCount=0;
        this.currentQuestion=""
        //step 1
        this.setQuestion();
        this.setUpAnswer({
            questionSetId:this.selectedQuestion._id,
            type:this.selectedQuestion.type,
            completedBy:this.sid
        })

        // this.$store.dispatch('answer/setUpAnswer',
        //   {
        //     questionSetId:this.selectedQuestion._id,
        //     type:this.selectedQuestion.type,
        //     completedBy:this.sid
        //   },{root:true})
      },

    destroyed() {
        console.log("destroyed")
        this.introCount=0;
        this.coreCount=0;
        this.currentQuestion=""
    },
 }
</script>

<style>
    
</style>