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
                Raduga is made possible with support from Creative Industries Fund NL, Wilhelmina E. Jansen Fund, and hundreds of donations from rainbow fans all over the world.
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
  },

  'zh': {
    'rainbow_spotted_pre': '最后发现的彩虹：',
    'rainbow_spotted_near': '',
    'rainbow_predicted_near': '彩虹预测在附近',
    'no_rainbow_alerts': '目前没有彩虹警报。',
    'you_are_near': '你就在附近: ',
    'you_are_too_far': '你离俄罗斯城市太远，无法收到彩虹通知。',
    'error': '错误',
    'ok': '好',
    'settings': '设置',
    'no_internet_dialog': 'Cǎihóng需要互联网连接',
    'gps_dialog': '打开gps使用相机',
    'cannot_use': '不能使用Cǎihóng，没有互联网连接。',
    'flag_heading': '标志照片因为: ',
    'flag_1': '版权违规',
    'flag_2': '不良内容',
    'cancel': '取消',
    'thanks': '谢谢你的举报。 我们的版主已收到通知。',
    'remove_image': '您确定要从流中删除此图片吗？',

    'about': `
<h2>About this app</h2>
<p>Cǎihóng uses live weather data to predict the formation of rainbows, and sends you an alert when rainbows are likely to appear in your neighbourhood.</p>

<p>You can spot, upload and share your rainbows – to show that rainbows are here to stay!</p>

<h2>关于此应用</h2>

<p>此彩虹应用使用实时天气数据来预测彩虹现象的发生。当彩虹在你所在地可能出现的时候，此应用将向你发送信息。</p>
<p>你也可以发布、上传、分享你的彩虹，告诉大家：彩虹与我们在一起！</p>


<h2>How to spot a rainbow:</h2>
<p>You can spot a rainbow when your back is facing the sun. In front of you, rain is falling. The droplets must be plump and round to refract the light, so that a rainbow appears.</p>
<p>The sun should be positioned low on the horizon. This is why most rainbows occur in the morning, and early evening.</p>

<h2>如何发现彩虹？</h2>

<p>下雨的时候，如果你背对阳光，就很可能会发现彩虹。雨滴足够饱满时可以反射阳光，让天空出现彩虹。</p>
<p>一般太阳在接近天际线时，会照射出七彩光芒，所以彩虹常常在清晨或者傍晚时出现。</p>

<h2>Photo upload notice</h2>
<p>All photos taken using this app will be freely available for other users to share and publish. </p>

<h2>照片上传须知</h2>
<p>所有通过此应用上传的照片，允许被其他用户免费分享或发布。</p>

<p><br />© Pink Pony Express<br />
Cǎihóng is made possible with support from Creative Industries Fund NL, Wilhelmina E. Jansen Fund, and hundreds of donations from rainbow fans all over the world.</p>

<p>版权归于 Pink Pony Express<br />
此彩虹应用得到了荷兰创意产业基金会、威廉敏娜·E·杨森基金会、以及世界各地彩虹爱好者的捐赠支持。</p>
    `
  }
}

export default function label(key) {
  const locale = Config.getLocale()
  return (LABELS[locale] && LABELS[locale][key]) || LABELS['en'][key]
}
