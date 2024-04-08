import { contacts } from './data.js';
import { reply } from './data.js';
import Picker from './emoji-picker.js';

const dt = luxon.DateTime;

const { createApp } = Vue;

//option object.
createApp({
  data() { //metodo data()
    return {
      contacts,
      reply,
      activeId: 1,
      chatIn: '',
      searchItem: '',
      currentMsg: -1,
      showEmoji: false,
      showChat: false,//flag for mediaquery show chat section.
      theme: true,//flag for change theme.
      ulShow: true,//flag for show the delete chat option on chat section.
      nameContact: '',
      numAvatar:'',
      showNewContact: true,



    }
  },
  methods: {
    clickActiveItem(id) {
      this.activeId = id;
      this.currentMsg = -1;
      this.showChat = !this.showChat
      console.log(this.activeId)
      console.log(this.getContact(this.activeId))
    },
    /**************** make a new message **************** */
    createMessag(msg, status) {
      const newObj = {
        date: dt.now().setLocale('it').toFormat('HH:mm:ss'),
        message: msg,
        status: status,
      }
      this.activeItem.messages.push(newObj);
      this.$nextTick(() => {
        this.$refs.mes[this.$refs.mes.length - 1].scrollIntoView({ behavior: 'smooth' })
      });
    },

    newMessag() {
      if (this.chatIn.trim() === '') {
        return;
      }
      this.createMessag(this.chatIn, 'sent');
      this.chatIn = '';
      setTimeout(() => {

        this.createMessag(this.randomReply(), 'received');
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
    getContact(id) {
      const contact = this.contacts.find((el) => el.id === id);
      const lastMessageIndex = contact.messages.length - 1;
      if (lastMessageIndex >= 0) {
        return contact.messages[lastMessageIndex];
      } else {
        return ''
      }
    },
    getLastMsg(id) {
      if (this.getContact(id) !== '') {
        return this.getContact(id).message;
      } else {
        return '';
      }

    },
    getLastDate(id) {
      if (this.getContact(id) !== '') {
        return this.getContact(id).date;
      } else {
        return '';
      }
    },
    randomReply() {
      const random = Math.floor(Math.random() * reply.length);

      const replyRandom = reply[random];

      return replyRandom

    },
    addContact() {
      let newContact = {
        id: '',
        name: this.nameContact,
        avatar: `./img/avatar_`+this.numAvatar+`.jpg`,
        visible: true,
        messages: [
          {
            date: dt.now().setLocale('it').toFormat('HH:mm:ss'),
            message: '',
            status: ''
          },
        ],
      }
      let nextId = 0;
      this.contacts.forEach((el) => {
        if (nextId < el.id) {
          nextId = el.id
        };
      });
      newContact.id = nextId + 1;
      this.contacts.push(newContact)
      this.showNewContact = true;
      console.log(this.numAvatar)
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
    console.log();
  },

}).component('Picker', Picker).mount('#app')