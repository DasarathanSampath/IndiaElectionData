import Vuex from 'vuex'
import Vue from 'vue'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        selectedYear: 2019,
        parliYears:[2019, 2014],        
        winnersData: null,
        performanceData: null,
        stateNames: null,
        constNames: null,
        constData: null,
        selectedState: null,
        selectedConst: null,
        legisStates:['tamilnadu', 'delhi'],
        selectedStateLegis: 'tamilnadu',
        yearsLegis: null,
        selectedYearLegis: null,
        performanceDataLegis: null,
        winnersDataLegis: null,
        constNamesLegis: null,
        selectedConstLegis: null,
        constDataLegis: null
    },
    actions: {
        fetchInitialData({state, commit, dispatch}, {selectedYear}) {
            if(selectedYear === null) { selectedYear = state.selectedYear }
            if(selectedYear !== state.selectedYear) { commit('setYear', {selectedYear}) }
            return new Promise((resolve, reject) => {
                firebase.database().ref('parliamentary').child(`${selectedYear}/performance`).once('value', snapshot => {                    
                        commit('setPerformanceData', {data: snapshot.val()})
                        resolve(state.performanceData)
                    })
                    .then(() => {
                        return new Promise((resolve, reject) => {
                            firebase.database().ref('parliamentary').child(`${selectedYear}/winners`).once('value', snapshot => {
                                commit('setWinnersData', {data: snapshot.val()})
                                resolve(state.winnersData)
                            })
                        })
                    })
                    .then(() => {
                        return new Promise((resolve, reject) => {
                            firebase.database().ref('parliamentary').child(`${selectedYear}/stateNames`).once('value', snapshot => {
                                commit('setStateNames', {data: snapshot.val()})
                                resolve(state.stateNames)
                            })
                        })
                    })
                    .then(() => {
                        dispatch('fetchSelectedState', {selectedState: state.stateNames[0]})
                    })
                })            
        },
        fetchSelectedState({state, commit}, {selectedState}) {
            commit('setSelectedState', {selectedState})            
            return new Promise((resolve, reject) => {
                firebase.database().ref('parliamentary').child(`${state.selectedYear}/constituencyNames/${state.selectedState}`).once('value', snapshot => {
                    commit('setConstNames', {data: snapshot.val()})                                
                    resolve(state.constNames)
                })
                .then(() => {
                    this.dispatch('fetchSelectedConst', {selectedConst: state.constNames[0]})
                })
            })
        },
        fetchSelectedConst({commit, state}, {selectedConst}) {
            commit('setSelectedConst', {selectedConst})
            return new Promise((resolve, reject) => {
                firebase.database().ref('parliamentary').child(`${state.selectedYear}/groupedData/${state.selectedState}/${state.selectedConst}`).once('value', snapshot => {
                    commit('setConstData', {data: snapshot.val()})
                    resolve(state.constData)
                })
            })
        },
        fetchInitialDataLegis({state, commit, dispatch}, {selectedStateLegis}) {
            if(selectedStateLegis === null) { selectedStateLegis = state.selectedStateLegis }
            if(selectedStateLegis !== state.selectedStateLegis) { commit('setSelectedStateLegis', {selectedStateLegis}) }
            return new Promise((resolve, reject) => {
                firebase.database().ref('legislative').child(`${selectedStateLegis}/years`).once('value', snapshot => {
                        commit('setYearsLegis', {data: snapshot.val()})
                        resolve(state.yearsLegis)
                    })
                    .then(() => {
                        dispatch('fetchSelectedYearLegis', {selectedYearLegis: state.yearsLegis[0]})
                    })
            })
        },
        fetchSelectedYearLegis({state, commit, dispatch}, {selectedYearLegis}) {
            commit('setSelectedYearLegis', {selectedYearLegis})
            return new Promise((resolve, reject) => {
                firebase.database().ref('legislative').child(`${state.selectedStateLegis}/${selectedYearLegis}/performance`).once('value', snapshot => {
                        commit('setPerformanceDataLegis', {data: snapshot.val()})
                        resolve(state.performanceDataLegis)
                    })
                    .then(() => {
                        return new Promise((resolve, reject) => {
                            firebase.database().ref('legislative').child(`${state.selectedStateLegis}/${selectedYearLegis}/winners`).once('value', snapshot => {
                                commit('setWinnersDataLegis', {data: snapshot.val()})
                                resolve(state.winnersDataLegis)
                            })
                        })
                    })
                    .then(() => {
                        return new Promise((resolve, reject) => {
                            firebase.database().ref('legislative').child(`${state.selectedStateLegis}/${selectedYearLegis}/constituencyNames`).once('value', snapshot => {
                                commit('setConstNamesLegis', {data: snapshot.val()})
                                resolve(state.constNamesLegis)
                            })
                        })
                    })
                    .then(() => {
                        this.dispatch('fetchSelectedConstLegis', {selectedConstLegis: state.constNamesLegis[0]})
                    })
            })                
        },
        fetchSelectedConstLegis({state, commit, dispatch}, {selectedConstLegis}) {
            commit('setSelectedConstLegis', {selectedConstLegis})
            return new Promise((resolve, reject) => {
                firebase.database().ref('legislative').child(`${state.selectedStateLegis}/${state.selectedYearLegis}/groupedData/${selectedConstLegis}`).once('value', snapshot => {
                    commit('setConstDataLegis', {data: snapshot.val()})
                    resolve(state.constDataLegis)
                })
            })
        }
    },
    mutations: {
        setYear(state, {selectedYear}) {
            state.selectedYear = selectedYear
        },
        setSelectedState(state, {selectedState}) {
            state.selectedState = selectedState
        },
        setStateNames (state, {data}) {
            state.stateNames = data
        },
        setConstNames (state, {data}) {
            state.constNames = data
        },
        setSelectedConst(state, {selectedConst}) {
            state.selectedConst = selectedConst
        },
        setConstData (state, {data}) {
            state.constData = data
        },
        setWinnersData (state, {data}) {
            state.winnersData = data
        },
        setPerformanceData (state, {data}) {
            state.performanceData = data
        },
        setSelectedStateLegis(state, {selectedStateLegis}) {
            state.selectedStateLegis = selectedStateLegis
        },
        setYearsLegis(state, {data}) {
            state.yearsLegis = data
        },
        setSelectedYearLegis(state, {selectedYearLegis}) {
            state.selectedYearLegis = selectedYearLegis
        },
        setPerformanceDataLegis(state, {data}) {
            state.performanceDataLegis = data
        },
        setWinnersDataLegis (state, {data}) {
            state.winnersDataLegis = data
        },
        setConstNamesLegis (state, {data}) {
            state.constNamesLegis = data
        },
        setSelectedConstLegis(state, {selectedConstLegis}) {
            state.selectedConstLegis = selectedConstLegis
        },
        setConstDataLegis (state, {data}) {
            state.constDataLegis = data
        }
    },
    getters: {
        parliYears(state) {
            return state.parliYears
        },
        selectedYear(state) {
            return state.selectedYear
        },
        stateNames(state) {
            return state.stateNames
        },
        selectedState(state) {
            return state.selectedState
        },
        constNames(state) {
            return state.constNames
        },
        selectedConst(state) {
            return state.selectedConst
        },
        constData(state) {
            return state.constData
        },
        winnersData(state) {
            return state.winnersData
        },        
        performanceData(state) {
            return state.performanceData
        },
        legisStates(state) {
            return state.legisStates
        },
        selectedStateLegis(state) {
            return state.selectedStateLegis
        },
        yearsLegis(state) {
            return state.yearsLegis
        },
        selectedYearLegis(state) {
            return state.selectedYearLegis
        },
        performanceDataLegis(state) {
            return state.performanceDataLegis
        },
        winnersDataLegis(state) {
            return state.winnersDataLegis
        },
        constNamesLegis(state) {
            return state.constNamesLegis
        },
        selectedConstLegis(state) {
            return state.selectedConstLegis
        },
        constDataLegis(state) {
            return state.constDataLegis
        }
    }
})
