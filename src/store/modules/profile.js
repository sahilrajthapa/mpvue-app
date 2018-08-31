const state={
    sid:""
}

const mutations={
  ['SET_SID'](state,sid){
      state.sid=sid
  }
}

const actions={
    setSid({commit},sid){
        commit('SET_SID',sid)
    }
}

export default{
    state,
    mutations,
    actions
}