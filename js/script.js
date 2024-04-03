import { contacts } from './data.js';

const { createApp } = Vue;



//option object.
createApp({
  data() { //metodo data()
    return {
      contacts,
     
    }
  },
  methods: {
  

  },
  computed: {
  
  },
  mounted() {
    console.log(contacts)
   

  },

}).mount('#app')