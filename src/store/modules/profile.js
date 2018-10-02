const SET_TOKEN = 'SET_TOKEN'
const SET_VERIFICATION = 'SET_VERIFICATION'
const SET_USER_INFO = 'SET_USER_INFO'

const state={
    token: '',
    verified: false,
    userInfo: {}
}

const mutations={
  [SET_TOKEN] (state,token){
      state.token = token
  },
  [SET_VERIFICATION] (state, verification) {
    state.verified = verification
  },
  [SET_USER_INFO] (state, userInfo) {
       state.userInfo = userInfo
  }
}

const actions={
    setToken({commit},token){
        commit(SET_TOKEN,token)
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