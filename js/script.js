import { contacts } from './data.js';

const { createApp } = Vue;



//option object.
createApp({
  data() { //metodo data()
    return {
      contacts,
      activeId: 1,
     
    }
  },
  methods: {
    clickActiveItem(id){
      return this.activeId = id
      
  },
},
  computed: {
    activeItem(){
      return this.contacts.find((el)=> el.id === this.activeId)
    },
   
  
  },
  mounted() {
    console.log(contacts)
   

  },

}).mount('#app')