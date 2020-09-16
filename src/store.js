import Vue from 'vue'
import vuex from 'vuex'
import axios from "axios";

Vue.use(vuex);

//creating module for error handling
const errorSystem={
    state:{
        showError:false,
        errorText:'errorMessage'
    },
    mutations:{
        showError(state,errorMessage){
            state.showError=true;
            state.errorText=errorMessage;
        }
    }
}


export default new vuex.Store({
    state:{

        students:[]
    },
    getters:{
        //if we want to get full name in component 
        students :state => state.students.map(s=>({...s,fullName:s.firstName+' '+s.lastName})),
        //get user by id in rendering
        findStudent : state =>id=> state.students.find(s=>s.id==id),
        isLoaded:state => !!state.students.length
    },
    mutations:{
        setStudents(state,students){
            state.students=students;
        },
        addStudent(state,student){
            state.students.push(student);
        },
        editStudent(state,student){
            const index= state.students.findIndex(s=>s.id==student.id);
            // state.students[index]=student; this is not a good way to update UI data vue.set() can help you with that
            vue.set(state.students,index,student);

        },

    },
    actions:{
        async getStudent(context){
            try {
                const students = (await axios.get('http://localhost:3000/students')).data;
                context.commit('setStudents',students);


            }catch (e) {
                console.log('mamad');
                context.commit('showError',e);
            }

        },
        async createStudent(context,{firstName,lastName}){
            //this kind is more readable
            const student = (await axios.post("http://localhost:3000/students", {firstName, lastName})).data;
            //this type is easier to write, we should pass names insteadd of {firstName,lastName}
            // const student = (await axios.post("http://localhost:3000/students", names)).data;
            context.commit('addStudent',student)
        },
        async editStudent(context, {id,names} ){
            const student= (await axios.put(`http://localhost:3000/students/${id}`, names)).data;
            context.commit('editStudent',student);

        }
    },
    modules:{
        error:errorSystem
    }
})

