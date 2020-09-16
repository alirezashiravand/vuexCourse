<template>
  <div >
    <v-flex sm8 offset-sm2>
      <v-card>
        <v-toolbar dark>
          <v-toolbar-title>Edit Student</v-toolbar-title>
        </v-toolbar>
        <v-container class="text-xs-center">
<!--          <v-progress-circular  if we dont use mapGetters-->
<!--                  -->
<!--                  v-if="!$store.getters.isLoaded"-->
<!--                  :size="70"-->
<!--                  :width="7"-->
<!--                  color="purple"-->
<!--                  indeterminate-->
<!--          />-->
          <v-progress-circular
                  v-if="!isLoaded"
                  :size="70"
                  :width="7"
                  color="purple"
                  indeterminate
          />
        </v-container>

        <v-form v-if="isLoaded">
          <v-container>
            <v-layout>
              <v-flex xs12 md4>
                <v-text-field @input="updateFirstName" :value="findStudent($route.params.id).firstName" label="firstName" required></v-text-field>

                <v-text-field  @input="updateLastName" :value="findStudent($route.params.id).lastName" label="lastName" required></v-text-field>
<!--                <v-text-field v-model="student.lastName" label="lastName" required></v-text-field> if we dont use mapGetters -->

              </v-flex>
            </v-layout>
          </v-container>
          <v-btn @click="submit">submit</v-btn>
        </v-form>
      </v-card>
    </v-flex>
    <br>
    <Students/>
  </div>
</template>

<script>
import axios from "axios";
import Students from "./Students";
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      firstName:'',
      lastName:''
    };
  },
   created() {

  },
  computed:{
    ...mapGetters([
      'isLoaded',
      'findStudent'
    ]
    )

  },
  methods: {
      async submit() {
        const student = this.findStudent(this.$route.params.id);
        //  if we made no changes to firstName and modify lastName the firstName is going to be empty so we use || statement
        const firstName=this.firstName || student.firstName;
        const lastName=this.lastName || student.lastName;

         await this.$store.dispatch('editStudent',{id: this.$route.params.id , names:{firstName,lastName}})
    },
      updateFirstName(value){
          this.firstName=value;
      },
      updateLastName(value){
          this.lastName=value;
      }
  },
  components: {
      Students
  }
};
</script>
