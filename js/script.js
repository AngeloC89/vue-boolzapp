import { contacts } from './data.js';

const dt = luxon.DateTime;

const { createApp } = Vue;



//option object.
createApp({
  data() { //metodo data()
    return {
      contacts,
      activeId: 1,
      chatIn: '',
      searchItem: '',
      currentMsg: -1,
     

    }
  },
  methods: {
    clickActiveItem(id) {
      this.activeId = id;
      this.currentMsg = -1;
    },

/**************** make a new message **************** */     
    createMessag(msg, status) {
      const newObj = {
        date: dt.now().setLocale('it').toFormat('HH:mm:ss'),
        message: msg,
        status: status,
      }
      return newObj
    },
    newMessag() {
      if (this.chatIn.trim() === '') {
        return;
      }
      const msg = this.createMessag(this.chatIn, 'sent');
      this.activeItem.messages.push(msg);
      this.chatIn = ''
      setTimeout(() => {
        this.activeItem.messages.push(this.createMessag('ok', 'received'));

      }, 1000);
    },
// function for show dropdown of message with delete the message
    openDropdown(index){
      if(this.currentMsg !== index){
        this.currentMsg = index
      }else {
        this.currentMsg = -1
      }
    },
    //function for remove the message
    removeMsg(index){
      this.activeItem.messages.splice(index, 1);
      this.currentMsg = -1;


    }

  },
  computed: {
    activeItem() {
      return this.contacts.find((el) => el.id === this.activeId)
    },

    searchList() {
      return this.contacts.filter((el) => el.name.toLowerCase().includes(this.searchItem.toLowerCase()));
    },


  },
  mounted() {
    console.log(contacts)


  },

}).mount('#app')