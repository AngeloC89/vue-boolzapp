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

    }
  },
  methods: {
    clickActiveItem(id) {
      return this.activeId = id
    },
    createMessag(msg, status) {
      const newObj = {
        date: dt.now().setLocale('it').toFormat('dd/MM/yyyy HH:mm:ss'),
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