import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data() {
    return {
      rawMeetup: null,
    };
  },

  mounted() {
    this.fetchMeetup();
  },

  computed: {
    meetup() {
      if (this.rawMeetup == null) {
        return;
      }

      return {
        ...this.rawMeetup,
        cover: this.rawMeetup.imageId
          ? getMeetupCoverLink(this.rawMeetup)
          : null,
        date: new Date(this.rawMeetup.date),
        localDate: new Date(this.rawMeetup.date).toLocaleString(
          navigator.language,
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          },
        ),
        ISODate: new Date(this.rawMeetup.date).toISOString().substr(0, 10),

        agenda: this.rawMeetup.agenda.map((item) => ({
          ...item,
          icon: `icon-${agendaItemIcons[item.type]}.svg`,
          title: item.title || item[item.type],
        })),
      };
    },
  },

  methods: {
    async fetchMeetup() {
      this.rawMeetup = await fetch(
        `${API_URL}/meetups/${MEETUP_ID}`,
      ).then((responce) => responce.json());
    },
  },
});
