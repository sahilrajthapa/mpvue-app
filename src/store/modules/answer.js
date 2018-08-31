
const state={
    answer:{
        introQuestions:[],
        questions:[],
        completedBy:"",
        type:"",
        questionSetId:""
    }    
}

const mutations={
    ['SETUP_ANSWER'](state,schema){
       state.answer.completedBy=schema.completedBy;
       state.answer.type=schema.type;
       state.answer.questionSetId=schema.questionSetId      
    },

    ['PUSH_INTRO'](state,answer){
      state.answer.introQuestions.push(answer);
    },

    ['PUSH_CORE'](state,answer){
        state.answer.questions.push(answer);
    }
}


const actions={
    setUpAnswer({commit},initField){        
        commit('SETUP_ANSWER',initField)
    },

    pushIntro({commit},answer){
        commit('PUSH_INTRO',answer)
    },
    pushCore({commit},answer){
        commit('PUSH_CORE',answer)
    }
}

export default{
    state,
    mutations,
    actions
}