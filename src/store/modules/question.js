import config from '../../config/config'

const state={
    questions:[

    ],
    selectedQuestion:{

    },
    introQuestions:[

    ],
    coreQuestions:[

    ],
    
}

const mutations={
    ['GET_ALL_QUESTIONS'](state,questions){
        console.log("questions",questions)
      state.questions=questions; 
      
    },

    ['SELECT_QUESTION'](state,question){

      state.selectedQuestion=question
      state.introQuestions=question.introQuestions
      state.coreQuestions=question.questions
      console.log("",state);
    }
}

const getters={
    hasIntroQuestion:state=>{
       if(state.introQuestions.length<=0){
           return false
       }
       return true
    },
    getIntroQuestionById:state=>(id)=>{
        console.log(id);
        return state.introQuestions[id];
    },
    getCoreQuestionById:state=>(id)=>{
        console.log(id);
        return state.coreQuestions[id]
    }
}

const actions={
    getAllQuestions({commit}){        
        wx.request({
            method:"GET",
            url: config.api.question,
            success:(res)=>{ 
                console.log("inside wxrequest",res.data.questions)
                commit('GET_ALL_QUESTIONS',res.data.questions)
                
                
            }
        }) 
    },
    selectQuestion({state,commit},question){
        let selectedQuestion=question;
        // state.questions.map((index,question)=>{
        //     if(question.type==type){
        //         selectedQuestion=question
        //     }
        // })
        commit('SELECT_QUESTION',question);

    }
}

export default{
    state,
    getters,
    mutations,
    actions
}