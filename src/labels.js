import Config from './Config'

const LABELS = {
  en: {
    'rainbow_spotted_pre': 'Last spotted rainbow:',
    'rainbow_spotted_near': ' ',
    'rainbow_predicted_near': 'Rainbows predicted near',
    'no_rainbow_alerts': 'No rainbow alerts at the moment.',
    'you_are_near': 'You are near:',
    'you_are_too_far': 'You are too far from a Russian city to receive rainbow notifications.',

    'error': 'Error',
    'ok': 'OK',
    'settings': 'Settings',
    'no_internet_dialog': 'Raduga requires an internet connection',
    'gps_dialog': 'Switch on gps to use the camera',
    'cannot_use': 'Cannot use Raduga, no internet connection available.',

    'flag_heading': 'Flag photo because:',
    'flag_1': 'Copyright violation',
    'flag_2': 'Objectionable content',
    'cancel': 'Cancel',
    'thanks': 'Thank you for reporting. Our moderators have been notified.',

    'remove_image': 'Are you sure you want to remove this image from your stream?',

    'about': `
            <h1>About this app:</h1>

            <p>Raduga uses live weather data to predict the formation of rainbows, and sends you an alert when rainbows are likely to appear in your neighbourhood.</p>
            <p>
              Introduced as a reaction to the ban on displaying the rainbow in public space in Russia, Raduga enables the masses to spot and capture rainbows everywhere.
            </p>

            <p>You can upload and share your own rainbows, to show that rainbows are here to stay.</p>

            <h2>How to spot a rainbow:</h2>
            <p>You can spot a rainbow when your back is facing the sun. In front of you, rain is falling. The droplets must be plump and round, in order to refract the light so that a rainbow appears.</p>
            <p>The sun should be positioned low on the horizon. This is why most rainbows occur in the morning, and early evening.</p>

            <h2>Photo upload notice</h2>
            <p>All photos taken using this app will be freely available for other users to share and publish.</p>

            <p>
                <br/>
                © Pink Pony Express
            </p>

            <p>
                <br/>
                Raduga is made possible with support from Creative Industries Fund NL, Wilhelmina E. Jansen Fund, and hundreds of donations from rainbow fans all over the world.
            </p>
            <br/><br/>
    `

  },
  ru: {
    'rainbow_spotted_pre': 'Последняя обнаруженная радуга:',
    'rainbow_spotted_near': '',

    'rainbow_predicted_near': 'Радуги предсказаны вблизи',
    'no_rainbow_alerts': 'Нет радуги оповещения на данный момент.',
    'you_are_near': 'Вы рядом с:',
    'you_are_too_far': 'Вы находитесь слишком далеко от города, чтобы получать уведомления радуги.',

    'error': 'ошибка',
    'ok': 'ок',
    'settings': 'установки',
    'no_internet_dialog': 'Радуге требуется соединение с интернетом',
    'gps_dialog': 'Включите gps, чтобы пользоваться камерой',
    'cannot_use': 'Невозможно использовать Радугу. Невозможно соединение с интернетом',

    'flag_heading': 'Отметьте фотографию в связи с:',
    'flag_1': 'содержанием изображения',
    'flag_2': 'нарушением копирайт',
    'cancel': 'Отмена',
    'thanks': 'Спасибо',

    'remove_image': 'Вы действительно хотите удалить этот файл?',

    about: `
      <h1>Об этом приложении:</h1>

      <p>
        “Радуга” использует текущую метеоинформацию, чтобы предсказать возможное образование радуг, и присылает вам уведомление, когда, по счастливому случаю, радуга оказывается рядом с Вами.
      </p>

      <p>
        Разработанная как ответ на запрет демонстрации радуги в публичном пространстве в России, Радуга дает возможность каждому поймать и запечатлеть радугу везде.
      </p>

      <p>
        “Радуга” дает возможность широким массам определять, отслеживать и фиксировать появление радуг где бы то ни было.
      </p>

      <p>
        <br/>
        Загружайте и делитесь Вашими наблюдениями, чтобы показать, что радуги никуда не делись.
      </p>

      <h2>Как увидеть радугу:</h2>

      <p>Чтобы увидеть радугу повернитесь спиной к солнцу, по направлению к дождю. Для образования радуги, капли дождя должны быть толстыми и круглыми, так они смогут преломить свет.</p>

      <p>Солнце должно быть низко над горизонтом. Именно поэтому, в большинстве случаев, радугу удается увидеть утром или ранним вечером.</p>

      <h2>Сообщение о загрузке фотографий</h2>
      <p>Все фотографии, снятые с использованием данного приложения, будут находиться в свободном доступе для других пользователей, чтобы они могли поделиться ими или их опубликовать.</p>

      <p>
        <br/>
        © Пинк Пони Экспресс
      </p>


      <p>
        <br/><br/>
        Мы смогли воплотить Радугу в жизнь, благодаря поддержке Фонда Творческих Индустрий Нидерландов ,Фонда Вильгельмины Янсен и сотням донаций фанатов радуги со всего света.
      </p>`
  }
}

export default function label(key) {
  const locale = Config.getLocale()
  return LABELS[locale] && LABELS[locale][key] || LABELS['en'][key]
}
