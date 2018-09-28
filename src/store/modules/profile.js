const SET_SID = 'SET_SID'
const SET_VERIFICATION = 'SET_VERIFICATION'
const SET_USER_INFO = 'SET_USER_INFO'

const state={
    sid: '',
    verified: false,
    userInfo: {}
}

const mutations={
  [SET_SID] (state,sid){
      state.sid=sid
  },
  [SET_VERIFICATION] (state, verification) {
    state.verified = verification
  },
  [SET_USER_INFO] (state, userInfo) {
       state.userInfo = userInfo
  }
}

const actions={
    setSid({commit},sid){
        commit(SET_SID,sid)
    },
    setVerification({commit}, verification) {
         commit(SET_VERIFICATION, verification)
    },
    setUserInfo({commit}, userInfo) {
         commit(SET_USER_INFO, userInfo)
    }
}

export default{
    state,
    mutations,
    actions
}