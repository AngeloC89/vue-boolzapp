import { contacts } from './data.js';
import Picker from './emoji-picker.js';

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
      showEmoji: false,


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
      // this.nextTick(()=> {
      //    this.$refs.msg[this.$refs.mesg.length - 1].scrollIntoView()
      // })

      this.chatIn = ''
      setTimeout(() => {
        this.activeItem.messages.push(this.createMessag('ok', 'received'));

      }, 1000);
    },
    // function for show dropdown of message with delete the message
    openDropdown(index) {
      if (this.currentMsg !== index) {
        this.currentMsg = index
      } else {
        this.currentMsg = -1
      }
    },
    //function for remove the message
    removeMsg(index) {
      this.activeItem.messages.splice(index, 1);
      this.currentMsg = -1;
    },
    onSelectEmoji(emoji) {
      console.log(emoji)
      this.chatIn += emoji.i;
      /*
        // result
        { 
            i: "😚", 
            n: ["kissing face"], 
            r: "1f61a", // with skin tone
            t: "neutral", // skin tone
            u: "1f61a" // without tone
        }
        */
    },
    getLastMsg(id) {
      const index = this.contacts.findIndex((el) => el.id === id);
      const lastMsgContact = this.contacts[index].messages.length - 1;
      if (index >= 0) {
        return this.contacts[index].messages[lastMsgContact].message;
      } else {
        return '';
      }
    },

    getLastDate(id) {
      const index = this.contacts.findIndex((el) => el.id === id);
      const lastDateContact = this.contacts[index].messages.length - 1;
      if (index >= 0) {
        return this.contacts[index].messages[lastDateContact].date;
      } else {
        return '';
      }
    },
  },

    computed: {
      activeItem() {
        return this.contacts.find((el) => el.id === this.activeId)
      },

      searchList() {
        return this.contacts.filter((el) => el.name.toLowerCase().includes(this.searchItem.toLowerCase()));
      },

      lastTime() {
        const index = this.activeItem.messages.length - 1;
        if (index >= 0 && this.activeItem.messages[index].status === 'received') {
          return this.activeItem.messages[index].date;
        } else {
          return '';
        }
      },






    },
    mounted() {
      console.log(contacts)


    },

  }).component('Picker', Picker).mount('#app')