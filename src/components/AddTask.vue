<template>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="400px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            <v-icon small v-if="name==='Add'">mdi-plus-circle</v-icon>
            <v-icon small v-else>mdi-pencil-box-outline</v-icon>
            {{name}}
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="primary" darkalign-center primary-title style='color: white;'>
            <span v-if="name=='Add'" class="text-h4"><v-icon large color="white">mdi-plus-circle</v-icon>Add Task</span>
            <span v-else>Edit Task</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-if="name=='Add'" label="Title" v-model="newTask.title" :rules=titleRules outlined></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field v-if="name==='UPDATE'" v-model="newTask.description" :rules="[v => !!v || 'Description is required']" outlined>this.description</v-text-field>
                  <v-text-field v-else label="Description" v-model="newTask.description" :rules="[v => !!v || 'Description is required']" outlined></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="newTask.date" transition="scale-transition" offset-y min-width="auto">

                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="newTask.date" label="Deadline" append-icon="mdi-calendar" v-bind="attrs" v-on="on" outlined></v-text-field>
                        </template>
                        <v-date-picker v-model="newTask.date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false" > Cancel </v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save((newTask.date))">OK </v-btn>
                            
                        </v-date-picker>

                    </v-menu>
                </v-col>

                <v-col cols="12">
                    <p>Priority</p>
                    <v-radio-group row v-model="newTask.row" newTask.row>
                        <v-radio label="Low" value="low" ></v-radio>
                        <v-radio label="Med" value="med" ></v-radio>
                        <v-radio label="High" value="high" ></v-radio>
                    </v-radio-group>
                </v-col>

            </v-row>
        </v-container>
    </v-card-text>
    <v-card-actions class="text-right">
        <v-spacer></v-spacer>
        
        <v-btn v-if="name=='Add'" color="primary" teclass="mr-4" @click="addNewTask()"><v-icon small>mdi-plus-circle</v-icon>Add</v-btn>
        <v-btn v-else color="primary" teclass="mr-4" @click="editTask()"><v-icon small color="white">mdi-pencil-box-outline</v-icon>Edit</v-btn>
        <v-btn color="error" class="mr-4" @click="resetTask()"><v-icon small>mdi-cancel</v-icon>Cancel </v-btn>
        
    </v-card-actions>
</v-card>
</v-dialog>
</v-row>

</template>
  
  <script>

    export default {
      name: 'toDo',
      props: {
        name: String,
        tasks: Array,
      },

      data(){
        return {
          valid: true,
          dialog: false,
          modal: false,
          menu: false,
          menu2: false,
          listOfTasks: this.tasks,

          titleRules:[
            v => !!v || 'Title is required',
            v => this.listOfTasks.find(a => a.title == v.title) || 'The title must be unique'
          ],
          
          newTask: {
            title: '',
            description: '',
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            row: null,
            checked: false,
            complete: false
          },
        }
      },

      methods: {
        addNewTask: function() {
          console.log(this.newTask.date)
          if(!this.newTask.title || !this.newTask.description){
            this.$toasted.error('The required filed must be fileld');
          }else if(this.listOfTasks.find(a => a.title === this.newTask.title)) {
            this.$toasted.error('The title of the task must be unique');
          }else{
            this.$toasted.success('Task added successfully!');
            this.$emit('create-new-task', this.newTask);
            this.resetTask();
          }
        },
        editTask: function() {
          this.$emit('edit-task', this.newTask);
          this.resetTask();
        },

        resetTask: function() {
          this.dialog = false;
          this.newTask = {
            title: "",
            description: "",
            date: null,
            row: null,
            checked: false,
            complete: false
          }
        }
      }
  }
  </script>