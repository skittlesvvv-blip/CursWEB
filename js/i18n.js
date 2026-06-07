   /* 
 * i18n.js
 * Модуль интернационализации (Ф-17)
 */

const I18n = {
    currentLang: 'ru',
    
    translations: { 
        ru: {
            // ===== НАВИГАЦИЯ (все страницы) =====
            nav_main: "ГЛАВНАЯ",
            nav_catalog: "КАТАЛОГ",
            nav_about: "О НАС",
            nav_delivery: "ДОСТАВКА И ОПЛАТА",
            nav_custom: "СДЕЛАНО НА ЗАКАЗ",
            nav_profile: "МОЙ АККАУНТ",
            nav_logout: "ВЫЙТИ",
            
            // ===== ВЕРХНЯЯ ПЛАШКА =====
            topbar_delivery: "БЕСПЛАТНАЯ ДОСТАВКА",
            topbar_close: "Закрыть",
            
            // ===== ГЛАВНАЯ СТРАНИЦА =====
            hero_title: "S T A Y &nbsp; W I L D",
            hero_alt: "SCÀLA Сумка из коллекции Stay Wild",
            handmade_title: "СДЕЛАНО ВРУЧНУЮ",
            handmade_text: "Каждая из наших сумок разрабатывается и производится в Италии опытными мастерами, которые уже не одно поколение создают кожаные изделия, сравнимые с произведением искусства.",
            instagram_title: "СЛЕДИТЕ ЗА НАМИ В <span class=\"instagram__title-underline\">INSTAGRAM</span>",
            store_title: "НАШ МАГАЗИН В МОГИЛЁВЕ",
            store_address: "ТЦ «Атриум», ул. Первомайская, 57",
            // ===== КАТАЛОГ =====
            search_placeholder: "Поиск сумок...",
            filter_all: "Все категории",
            filter_chic: "CHIC",
            filter_classic: "CLASSIC",
            filter_casual: "CASUAL",
            filter_sport: "SPORT",
            filter_travel: "TRAVEL",
            filter_accessories: "ACCESSORIES",
            filter_sale: "SALE",
            filter_limited: "LIMITED",
            sort_default: "По умолчанию",
            sort_price_asc: "Цена: по возрастанию",
            sort_price_desc: "Цена: по убыванию",
            sort_name_asc: "Название: А-Я",
            btn_details: "ПОДРОБНЕЕ",
            btn_quick_view: "БЫСТРЫЙ ПРОСМОТР",
            
            // ===== ТОВАРЫ (общие) =====
            product_color: "ЦВЕТ",
            product_login_required: "* Для покупки необходимо войти в аккаунт",
            btn_gift: "НАМЕКНУТЬ О ПОДАРКЕ",
            tab_details: "ДЕТАЛИ",
            tab_size: "РАЗМЕР",
            tab_delivery: "ДОСТАВКА И ВОЗВРАТ",
            size_dimensions: "Размеры:",
            size_strap: "Длина ремня:",
            size_weight: "Вес:",
            size_capacity: "Вмещает:",
            delivery_belarus: "Доставка:",
            delivery_return: "Возврат:",
            delivery_payment: "Оплата:",
            delivery_contact: "Вопросы:",
            related_title: "ВАМ МОЖЕТ ТАК ЖЕ ПОНРАВИТЬСЯ",
                        // ===== ИЗБРАННОЕ =====
            favorites_title: "Избранное",
            favorites_empty: "Ваше избранное пусто",
            favorites_empty_desc: "Здесь будут товары, которые вам понравились",

            // ===== ТОВАР GRETA MEDIUM =====
            product_greta_title: "GRETA MEDIUM",
            greta_desc: "Квадратный силуэт, мягкие скруглённые формы делают эту модель женственной и притягательной. Оптимальный размер для тех, кто не любит габаритные сумки, но хочет вместить всё необходимое.",

            // ===== ВАКАНСИИ =====
            vacancies_breadcrumb: "ВАКАНСИИ",
            vacancies_hero_title: "Присоединяйся к команде SCÀLA",
            vacancies_hero_subtitle: "Мы всегда ищем талантливых людей, которые разделяют наши ценности",
            vacancies_form_title: "Подать заявку",
            vacancies_form_subtitle: "Заполните форму ниже, и наш HR-менеджер свяжется с вами в ближайшее время",
            vacancies_form_name: "Имя *",
            vacancies_form_email: "E-mail *",
            vacancies_form_phone: "Телефон",
            vacancies_form_position: "Желаемая должность",
            vacancies_form_position_placeholder: "Выберите позицию...",
            vacancies_position_consultant: "Консультант по продажам",
            vacancies_position_manager: "Менеджер",
            vacancies_position_designer: "Дизайнер",
            vacancies_position_photographer: "Фотограф",
            vacancies_form_message: "Сообщение / Расскажите о себе",
            vacancies_form_submit: "Отправить заявку",

            // ===== КВИЗ =====
            quiz_promo_title: "Подберите сумку своей мечты",
            quiz_promo_subtitle: "Пройдите короткий тест и получите персональную рекомендацию",
            btn_take_quiz: "Пройти квиз",

            // ===== ФИЛЬТРЫ =====
            filter_classic: "Классика",
            filter_printed: "Принт",

                        // ===== ДОПОЛНИТЕЛЬНЫЕ КЛЮЧИ ДЛЯ A11Y =====
            a11y_scheme_1: "Черно-белая",
            a11y_scheme_2: "Черно-зеленая",
            a11y_scheme_3: "Бело-черная",
            a11y_scheme_4: "Бежево-кориченевая",
            a11y_scheme_5: "Голубо-синяя",
            a11y_no_images: "Скрыть изображения",
            a11y_reset: "Сбросить настройки",
            a11y_close: "Закрыть",
                        // ===== ОТЗЫВЫ =====
            reviews_title: "Отзывы",
            reviews_title: "Отзывы о товаре",
            review_form_title: "Оставить отзыв",
            review_placeholder: "Поделитесь своим впечатлением о товаре...",
            btn_publish_review: "Опубликовать отзыв",
            reviews_empty: "Пока нет отзывов.",
            reviews_be_first: "Будьте первым!",
           // ===== ТОВАРЫ (индивидуальные названия) =====
            product_monica_big: "MONICA BIG",
            product_monica_big_title: "MONICA BIG",
            monica_big_desc: "Изысканная геометрическая форма и хищное цветовое решение. Достаточно вместительная для повседневного использования. Блистательная для вечернего выхода.",
            
            product_monica_small: "MONICA SMALL",
            product_monica_small_title: "MONICA SMALL",
            monica_small_desc: "Блистательная компактная модель, приковывающая взгляды своей фактурой и расцветкой. Беспроигрышный вариант для летних вечеров!",
            
            product_greta: "GRETA MEDIUM",
            product_greta_medium_title: "GRETA MEDIUM",
            greta_medium_desc: "Квадратный силуэт, мягкие скруглённые формы делают эту модель женственной и притягательной. Оптимальный размер для тех, кто не любит габаритные сумки.",
            
            product_black: "BLACK",
            product_black_title: "BLACK",
            black_desc: "Вечная классика в безупречном исполнении. Глубокий черный цвет и лаконичный силуэт делают эту сумку универсальным аксессуаром на каждый день.",
            
            product_blue_dark: "BLUE/DARK",
            product_blue_dark_title: "BLUE/DARK",
            blue_dark_desc: "Благородный темно-синий оттенок, граничащий с черным. Элегантная классика для вечерних выходов и деловых встреч.",
            
            product_blue_orange: "BLUE/ORANGE",
            product_blue_orange_title: "BLUE/ORANGE",
            blue_orange_desc: "Смелое сочетание глубокого синего и яркого оранжевого. Эта модель создана для тех, кто не боится выделяться.",
            
            product_snake_1: "SNAKE BAG #1",
            product_snake_1_title: "SNAKE BAG #1",
            snake_1_desc: "Хищная фактура и геометрическая форма. Сумка, которая говорит сама за себя. Идеальный акцент для смелых образов.",
            
            product_snake_2: "SNAKE BAG #2",
            product_snake_2_title: "SNAKE BAG #2",
            snake_2_desc: "Утонченная геометрия и природная красота кожи питона. Модель, которая добавит характер любому образу.",
            
            product_snake_3: "SNAKE BAG #3",
            product_snake_3_title: "SNAKE BAG #3",
            snake_3_desc: "Стильная и практичная модель с выразительным рельефом. Идеально подходит для динамичного ритма города.",
            
            product_leopard: "LEOPARD",
            product_leopard_title: "LEOPARD",
            leopard_desc: "Дерзкий леопардовый принт и безупречная геометрия. Эта модель для тех, кто не боится быть в центре внимания.",
                      
            // ===== О НАС =====
            about_title: "О БРЕНДЕ",
            about_story_1: "Передвигаясь по миру, вдохновляясь культурами разных стран, изучая и осваивая ценнейшие",
            about_story_2: "техники кожевенного ремесла, в 2018 году мы создали бренд SCALA, воплощающий",
            about_story_3: "подлинность, страсть и свободу в самовыражении.",
            about_desc_1: "Создавая новую модель сумки, думая о цвете и фактуре, мы представляем образ современной женщины — сильной и независимой, свободной от чужих оценок, творческой, дикой в своем естестве, которая несмотря на предрассудки меняет мир и привносит свой неоценимый вклад в общество.",
            about_desc_2: "Мы в свою очередь хотим показать — любая женщина, где бы она ни находилась, обладает законным правом быть собой!",
            about_quote: "НЕ ЖИВИ ПО ПРАВИЛАМ!<br>СОЗДАВАЙ СВОИ ПРАВИЛА!",
            about_production: "ПРОИЗВОДСТВО",
            production_1: "В эру стремительного развития технологий и глобальной механизации мы отдаем предпочтение проверенным столетиями техникам производства.",
            production_2: "Мы стремимся поддерживать и развивать ручное мастерство, выстраивать связи с маленькими семейными фабриками, внося вклад в сохранение ремесла.",
            production_3: "Каждая из наших сумок разрабатывается и производится в Италии опытными мастерами, которые уже не одно поколение создают кожаные изделия, сравнимые с произведением искусства.",
            production_4: "Качество не бывает случайным, это результат тщательно продуманных процессов и работы профессионалов. Мы тратим много времени и сил на разработку и улучшение дизайна и достижение высокого уровня.",
            about_consumption: "РАЗУМНОЕ ПОТРЕБЛЕНИЕ",
            consumption_1: "Мы работаем только с надежными и ответственными поставщиками из Италии. Вся кожа рептилий поставляется с необходимыми документами СИТЕС.",
            consumption_2: "Мы стремимся к ответственному производству и призываем к осознанному потреблению.",
            about_contacts: "КОНТАКТЫ",
            
            // ===== ДОСТАВКА =====
            delivery_title: "ДОСТАВКА",
            delivery_belarus_free: "Бесплатная доставка во все регионы Беларуси",
            delivery_belarus_time: "Срок — 3–5 рабочих дней.",
            delivery_cis: "Доставка в страны СНГ — 80 BYN",
            delivery_cis_time: "Срок уточняется при оформлении заказа.",
            delivery_international: "Международная доставка",
            delivery_international_desc: "Для приобретения товаров с доставкой в страны дальнего зарубежья воспользуйтесь <a href=\"#\" data-i18n=\"delivery_en_link\">англоязычной версией сайта</a>.",
            delivery_en_link: "англоязычной версией сайта",
            delivery_contact_desc: "Если вам необходимо внести изменения или сообщить нам дополнительные детали, просьба обратиться к нашему менеджеру в WhatsApp по номеру телефона:",
            delivery_process: "Доставка формируется и передается курьерской службе в течение 1 рабочего дня с момента оформления заказа.",
            payment_title: "ОПЛАТА",
            payment_online: "Оплата товара производится на сайте online.<br>Оплата доставки (международная, страны СНГ и Беларуси) производится получателем отдельно, на сайте online.",
            payment_security: "Правила оплаты и безопасность платежей, конфиденциальность информации.",
            payment_sber: "ОПЛАТА БАНКОВСКИМИ КАРТАМИ ОСУЩЕСТВЛЯЕТСЯ ЧЕРЕЗ ПАО СБЕРБАНК",
            payment_cards: "К ОПЛАТЕ ПРИНИМАЮТСЯ КАРТЫ VISA, MASTERCARD, МИР",
            payment_legal_1: "Услуга оплаты через интернет осуществляется в соответствии с Правилами международных платежных систем Visa, MasterCard и Платежной системы МИР на принципах соблюдения конфиденциальности и безопасности совершения платежа, для чего используются самые современные методы проверки, шифрования и передачи данных по закрытым каналам связи. Ввод данных банковской карты осуществляется на защищенной платежной странице ПАО СБЕРБАНК.",
            payment_legal_2: "На странице для ввода данных банковской карты потребуется ввести данные банковской карты: номер карты, имя владельца карты, срок действия карты, трёхзначный код безопасности (CVV2 для VISA, CVC2 для MasterCard, Код Дополнительной Идентификации для МИР). Все необходимые данные пропечатаны на самой карте. Трёхзначный код безопасности — это три цифры, находящиеся на обратной стороне карты.",
            payment_legal_3: "Далее вы будете перенаправлены на страницу Вашего банка для ввода кода безопасности, который придет к Вам в СМС. Если код безопасности к Вам не пришел, то следует обратиться в банк выдавший Вам карту.",
            payment_errors: "<strong>Случаи отказа в совершении платежа:</strong><br>банковская карта не предназначена для совершения платежей через интернет, о чем можно узнать, обратившись в Ваш Банк;<br>недостаточно средств для оплаты на банковской карте. Подробнее о наличии средств на банковской карте Вы можете узнать, обратившись в банк, выпустивший банковскую карту;<br>данные банковской карты введены неверно;<br>истек срок действия банковской карты. Срок действия карты, как правило, указан на лицевой стороне карты (это месяц и год, до которого действительна карта). Подробнее о сроке действия карты Вы можете узнать, обратившись в банк, выпустивший банковскую карту.",
            payment_support: "По вопросам оплаты с помощью банковской карты и иным вопросам, связанным с работой сайта, Вы можете обращаться по телефону <a href=\"tel:+375292178828\">+375 (29) 217-88-28</a> или по электронной почте <a href=\"mailto:info@scalabag.com\">info@scalabag.com</a>",
            
            // ===== СДЕЛАНО НА ЗАКАЗ =====
            custom_title: "СДЕЛАНО НА ЗАКАЗ",
            custom_intro: "Наш опыт, экспертиза и доступ к лучшим итальянским материалам позволяют нам создать любую модель персонально для вас — от разработки дизайна до выбора материалов и фурнитуры, которые могут быть представлены в единичном экземпляре.",
            custom_highlight: "СУМКА СТАНОВИТСЯ УНИКАЛЬНЫМ И ЛИЧНЫМ АКСЕССУАРОМ, ПОДЧЕРКИВАЮЩИМ ИНДИВИДУАЛЬНОСТЬ ЖЕНЩИНЫ, КОТОРАЯ ЕЕ НОСИТ.",
            custom_personalization: "Вся наша продукция изготавливается на фабрике в Италии, поэтому мы можем выполнить любой запрос наших клиентов. Каждая сделанная на заказ сумка будет персонализирована инициалами клиента, с присвоенным уникальным номером и Сертификатом.",
            custom_form_title: "ОСТАВЬТЕ ЗАЯВКУ",
            custom_form_desc: "Заполните форму ниже, и наш менеджер свяжется с вами для обсуждения деталей вашего заказа.",
            custom_quote: "НАША ЦЕЛЬ — СОЗДАНИЕ<br>УНИКАЛЬНОГО ПРОДУКТА",
            custom_contact: "Более подробную информацию по данной услуге Вы можете получить, отправив запрос на почту <a href=\"mailto:info@scalabag.com\">info@scalabag.com</a>",
            custom_success: "✅ Спасибо! Ваша заявка принята. Менеджер свяжется с вами в ближайшее время.",
            
            // ===== КОРЗИНА =====
            cart_title: "ВАША КОРЗИНА",
            cart_empty: "Корзина пуста",
            cart_empty_desc: "Добавьте товары из каталога, чтобы оформить заказ",
            cart_continue: "ПРОСМОТРЕТЬ КАТАЛОГ",
            cart_subtotal: "Итого:",
            cart_checkout: "ОФОРМИТЬ ЗАКАЗ",
            cart_remove: "Удалить",
            cart_qty: "Кол-во:",
            cart_update: "Обновить",
            cart_success: "Товар добавлен в корзину!",
            cart_removed: "Товар удалён из корзины",
            cart_updated: "Корзина обновлена",
            cart_discount: "Скидка:",
            cart_discount_applied: "Применена скидка {{value}}%",
            
            // ===== ЛИЧНЫЙ КАБИНЕТ =====
            profile_title: "МОЙ АККАУНТ",
            profile_greeting_default: "Добро пожаловать!",
            profile_greeting: "Добро пожаловать, ",
            profile_personal: "ЛИЧНЫЕ ДАННЫЕ",
            profile_loyalty: "ПРОГРАММА ЛОЯЛЬНОСТИ",
            loyalty_desc: "Совершайте покупки и получайте баллы. При достижении 10 000 BYN вы получите лимитированную сумку SCÀLA!",
            loyalty_progress: "До подарка: ",
            profile_orders: "ИСТОРИЯ ЗАКАЗОВ",
            profile_no_orders: "У вас пока нет заказов.",
            profile_settings: "НАСТРОЙКИ",
            settings_newsletter: "Получать новости и предложения по e-mail",
            settings_sms: "Получать уведомления о статусе заказа по SMS",
            btn_edit: "РЕДАКТИРОВАТЬ",
            btn_save: "СОХРАНИТЬ НАСТРОЙКИ",
            notify_settings_saved: "Настройки сохранены!",
            confirm_logout: "Вы действительно хотите выйти?",
            
            // ===== ВХОД / РЕГИСТРАЦИЯ =====
            login_title: "ВХОД",
            login_no_account: "Нет аккаунта?",
            login_register: "Зарегистрироваться",
            login_email: "E-mail *",
            login_email_placeholder: "your@email.com",
            login_password: "Пароль *",
            login_password_placeholder: "••••••••",
            login_remember: "Запомнить меня",
            login_btn: "ВОЙТИ",
            login_forgot: "Забыли пароль?",
            login_success: "Вход выполнен!",
            login_error: "Неверный email или пароль",
            
            register_title: "НОВЫЙ АККАУНТ",
            register_have_account: "Уже есть аккаунт?",
            register_login: "Войти",
            register_email: "E-mail *",
            register_email_placeholder: "your@email.com",
            register_password: "Пароль *",
            register_password_placeholder: "••••••••",
            register_password_confirm: "Повторите пароль *",
            register_password_confirm_placeholder: "••••••••",
            register_name: "Имя *",
            register_name_placeholder: "Ваше имя",
            register_surname: "Фамилия *",
            register_surname_placeholder: "Ваша фамилия",
            register_phone: "Телефон",
            register_phone_placeholder: "+375(29)1234567",
            register_birth: "Дата рождения *",
            register_birth_placeholder: "дд-мм-гггг",
            register_nickname: "Никнейм",
            register_nickname_placeholder: "auto_generated",
            register_subscribe: "Я хочу подписаться на рассылку, чтобы получить приоритетный доступ к распродажам и в числе первых узнавать о новинках.",
            register_agree: "Я прочитал(а) и согласен(на) с <a href=\"#\" target=\"_blank\">Соглашением пользователя</a> *",
            btn_register: "ЗАРЕГИСТРИРОВАТЬСЯ",
            btn_regenerate: "🔄 Сгенерировать",
            btn_edit_nickname: "✏️ Изменить",
            register_success: "Регистрация успешна!",
            
            // ===== ВАКАНСИИ =====
            vacancies_title: "ВАКАНСИИ",
            vacancy_form_title: "Подать заявку",
            form_name: "Имя *",
            form_name_placeholder: "Ваше имя",
            form_email: "E-mail *",
            form_email_placeholder: "your@email.com",
            form_phone: "Телефон *",
            form_phone_placeholder: "+375(29)1234567",
            form_position: "Должность *",
            form_select: "Выберите...",
            form_message: "Сообщение",
            form_message_placeholder: "Расскажите о своём опыте...",
            form_description: "Описание вашего заказа *",
            form_description_placeholder: "Опишите желаемую модель, материалы, размер, детали...",
            form_sketch: "Эскиз или референс (необязательно)",
            form_sketch_placeholder: "Выберите файл",
            form_sketch_hint: "* Макс. размер: 5MB. Форматы: JPG, PNG, PDF",
            form_agree: "Я согласен на обработку персональных данных",
            btn_submit_vacancy: "ОТПРАВИТЬ ЗАЯВКУ",
            btn_submit_custom: "ОТПРАВИТЬ ЗАЯВКУ",
            vacancy_success: "✅ Заявка отправлена!",
                        // ===== МОДАЛЬНЫЕ ОКНА =====
            modal_added_to_cart: "Товар добавлен в корзину!",
            modal_added_to_favorites: "Добавлено в избранное!",
            modal_quick_view_title: "Быстрый просмотр",
            modal_continue_shopping: "Продолжить покупки",
            modal_go_to_cart: "Перейти в корзину",
            modal_go_to_favorites: "Перейти в избранное",
            modal_remove_confirm: "Вы уверены, что хотите удалить товар?",
            modal_yes: "Да",
            modal_no: "Нет",
            modal_success: "Успешно!",
            modal_error: "Ошибка",
            modal_close: "Закрыть",
            modal_login_required: "Для этого действия нужно войти в аккаунт",
            modal_login_btn: "Войти",
// ===== АДМИН-ПАНЕЛЬ =====
admin_title: "АДМИН-ПАНЕЛЬ",
admin_products: "ТОВАРЫ",
admin_orders: "ЗАКАЗЫ",
admin_vacancies: "ВАКАНСИИ",
admin_custom: "КАСТОМ-ЗАКАЗЫ",
admin_users: "ПОЛЬЗОВАТЕЛИ",
admin_settings: "НАСТРОЙКИ",
admin_data: "УПРАВЛЕНИЕ ДАННЫМИ",
admin_reset_desc: "Очистить все данные сайта (корзина, избранное, настройки, заказы)?",
admin_reset_btn: "⚠️ СБРОСИТЬ ВСЕ ДАННЫЕ",
admin_access_denied: "Доступ запрещён",
admin_access_desc: "Только администратор может управлять данными.",
admin_stats_error: "Не удалось загрузить статистику",
admin_no_users: "Пользователи не найдены",
admin_no_orders: "Заказы не найдены",
admin_user_name: "Имя",
admin_user_email: "Email",
admin_user_role: "Роль",
admin_user_registered: "Дата регистрации",
admin_order_id: "ID заказа",
admin_order_user: "Пользователь",
admin_order_total: "Сумма",
admin_order_status: "Статус",
admin_order_date: "Дата",
admin_actions: "Действия",
admin_total_users: "Всего пользователей",
admin_total_orders: "Всего заказов",
admin_pending_orders: "Ожидают подтверждения",
admin_revenue: "Выручка",
admin_user_updated: "Пользователь обновлён",
admin_user_deleted: "Пользователь удалён",
admin_order_updated: "Статус заказа обновлён",
admin_product_added: "Товар добавлен",
admin_product_updated: "Товар обновлён",
admin_product_deleted: "Товар удалён",
admin_data_reset: "Данные сброшены",
admin_cannot_delete_self: "Нельзя удалить самого себя",
role_buyer: "Покупатель",
role_admin: "Администратор",
            
            // ===== КОЛЕСО УДАЧИ =====
            wheel_title: "🎡 КОЛЕСО УДАЧИ",
            wheel_desc: "Крутите колесо и получите скидку до 20%!",
            wheel_spin: "КРУТИТЬ",
            wheel_spinning: "Крутится...",
            wheel_already_spun: "Вы уже крутили колесо сегодня!",
            wheel_already_spun_btn: "Вы уже крутили сегодня",
            wheel_result_win: "🎉 Поздравляем! Скидка {{value}}%!",
            wheel_result_lose: "😔 Не повезло, попробуйте в следующий раз!",
            wheel_active_discount: "Ваша активная скидка: {{value}}%",
            wheel_login_required: "Войдите, чтобы крутить колесо",
            wheel_note: "* Доступно зарегистрированным пользователям",
            wheel_result_5: "🎉 Поздравляем! Скидка 5%",
            wheel_result_10: "🎉 Поздравляем! Скидка 10%",
            wheel_result_15: "🎉 Поздравляем! Скидка 15%",
            wheel_result_20: "🎉 Поздравляем! Скидка 20%",
            wheel_result_try: "Попробуйте ещё раз!",
            // В ru:
wheel_result_win: "🎉 Вы выиграли <strong>{{value}}</strong> скидку!",
wheel_result_lose: "😔 В этот раз без скидки...",
            // ===== ФУТЕР =====
            footer_exchange: "ОБМЕН И ВОЗВРАТ",
            footer_warranty: "ГАРАНТИЯ И УХОД",
            footer_gift: "ПОДАРОЧНАЯ КАРТА",
            footer_subscribe: "ПОДПИШИТЕСЬ, ЧТОБЫ ПОЛУЧАТЬ ОБНОВЛЕНИЯ, ДОСТУП К ЭКСКЛЮЗИВНЫМ ПРЕДЛОЖЕНИЯМ",
            footer_email_placeholder: "NAME@EMAIL.COM",
            footer_subscribe_btn: "ПОДПИСАТЬСЯ",
            footer_contacts: "КОНТАКТЫ",
            footer_offer: "ПУБЛИЧНАЯ ОФЕРТА",
            footer_career: "КАРЬЕРА",
            footer_rights: "Все права защищены.",
            
            // ===== ОБЩИЕ КНОПКИ И СООБЩЕНИЯ =====
            btn_buy: "КУПИТЬ",
            btn_gift: "НАМЕКНУТЬ О ПОДАРКЕ",
            btn_details: "ПОДРОБНЕЕ",
            btn_quick_view: "БЫСТРЫЙ ПРОСМОТР",
            btn_back: "← На главную",
            btn_home: "На главную",
            btn_catalog: "В каталог",
            btn_clear: "Очистить",
            btn_cancel: "Отмена",
            btn_confirm: "Подтвердить",
            
           // ===== СООБЩЕНИЯ ОБ ОШИБКАХ =====
error_required: "Обязательное поле",
error_email: "Некорректный email",
error_email_exists: "Пользователь с таким email уже существует",
error_password: "Пароль: 8-20 символов, заглавная, строчная, цифра, спецсимвол",
error_password_length: "8-20 символов",              // ✅ НОВОЕ
error_password_weak: "Слишком простой пароль",       // ✅ НОВОЕ
error_password_mismatch: "Пароли не совпадают",
error_phone: "Формат: +375(29)1234567",
error_birth_format: "Формат: дд-мм-гггг",            // ✅ НОВОЕ (заменяет/дополняет error_birth)
error_birth_invalid: "Некорректная дата",            // ✅ НОВОЕ
error_birth_age: "Вам должно быть не менее 16 лет",  // ✅ НОВОЕ
error_name: "Только буквы, пробелы, дефис",          // ✅ НОВОЕ
error_nickname: "3-20 символов: латиница, цифры, _", // ✅ НОВОЕ
error_agree: "Необходимо согласие",
error_agree_required: "Необходимо согласие",
error_form: "Пожалуйста, исправьте ошибки в форме",
error_login: "Неверный email или пароль",
error_submit: "Ошибка. Попробуйте позже.",
            
            // ===== УВЕДОМЛЕНИЯ =====
            notify_added: "Товар добавлен в корзину!",
            notify_removed: "Товар удалён",
            notify_updated: "Корзина обновлена",
            notify_favorited: "Добавлено в избранное",
            notify_unfavorited: "Удалено из избранного",
            notify_settings_saved: "Настройки сохранены!",
            notify_lang_changed: "Язык изменён на ",
            
            // ===== ДОСТУПНОСТЬ =====
            a11y_label: "Версия для слабовидящих",
            a11y_font_label: "Размер шрифта:",
            a11y_font_small: "A",
            a11y_font_medium: "A+",
            a11y_font_large: "A++",
            a11y_scheme_label: "Цветовая схема:",
            a11y_scheme_white: "⚪",
            a11y_scheme_black: "⚫⚪",
            a11y_scheme_blue: "🔵🟦",
            a11y_images_toggle: "🖼️ Изображения",
            a11y_images_show: "🖼️ Показать изображения",
            a11y_images_hide: "🖼️ Скрыть изображения",
            a11y_back: "← Обычная версия"
        },
        
        en: {
            // ===== NAVIGATION =====
            nav_main: "HOME",
            nav_catalog: "CATALOG",
            nav_about: "ABOUT",
            nav_delivery: "DELIVERY & PAYMENT",
            nav_custom: "CUSTOM ORDER",
            nav_profile: "MY ACCOUNT",
            nav_logout: "LOG OUT",
            
            // ===== TOP BAR =====
            topbar_delivery: "FREE DELIVERY",
            topbar_close: "Close",
            
            // ===== HERO =====
            hero_title: "S T A Y &nbsp; W I L D",
            hero_alt: "SCÀLA Bag from Stay Wild collection",
            handmade_title: "HANDMADE",
            handmade_text: "Each of our bags is designed and crafted in Italy by experienced artisans who have been creating leather goods comparable to works of art for generations.",
            instagram_title: "FOLLOW US ON <span class=\"instagram__title-underline\">INSTAGRAM</span>",
            store_title: "OUR STORE IN MOGILEV",
            store_address: "Atrium Shopping Center, Pervomayskaya St. 57",
            // ===== CATALOG =====
            search_placeholder: "Search bags...",
            filter_all: "All categories",
            filter_chic: "CHIC",
            filter_classic: "CLASSIC",
            filter_casual: "CASUAL",
            filter_sport: "SPORT",
            filter_travel: "TRAVEL",
            filter_accessories: "ACCESSORIES",
            filter_sale: "SALE",
            filter_limited: "LIMITED",
            sort_default: "Default",
            sort_price_asc: "Price: Low to High",
            sort_price_desc: "Price: High to Low",
            sort_name_asc: "Name: A-Z",
            btn_details: "DETAILS",
            btn_quick_view: "QUICK VIEW",
            
            // ===== PRODUCTS (common) =====
            product_color: "COLOR",
            product_login_required: "* Please log in to purchase",
            btn_gift: "GIFT HINT",
            tab_details: "DETAILS",
            tab_size: "SIZE",
            tab_delivery: "DELIVERY & RETURN",
            size_dimensions: "Dimensions:",
            size_strap: "Strap length:",
            size_weight: "Weight:",
            size_capacity: "Fits:",
            delivery_belarus: "Delivery:",
            delivery_return: "Return:",
            delivery_payment: "Payment:",
            delivery_contact: "Questions:",
            related_title: "YOU MAY ALSO LIKE",
                        // ===== FAVORITES =====
            favorites_title: "Favorites",
            favorites_empty: "Your favorites list is empty",
            favorites_empty_desc: "Items you liked will appear here",

            // ===== GRETA MEDIUM =====
            product_greta_title: "GRETA MEDIUM",
            greta_desc: "Square silhouette, soft rounded shapes make this model feminine and attractive. Optimal size for those who don't like bulky bags but want to fit everything they need.",

            // ===== VACANCIES =====
            vacancies_breadcrumb: "VACANCIES",
            vacancies_hero_title: "Join the SCÀLA team",
            vacancies_hero_subtitle: "We are always looking for talented people who share our values",
            vacancies_form_title: "Submit application",
            vacancies_form_subtitle: "Fill out the form below and our HR manager will contact you shortly",
            vacancies_form_name: "Name *",
            vacancies_form_email: "E-mail *",
            vacancies_form_phone: "Phone",
            vacancies_form_position: "Desired position",
            vacancies_form_position_placeholder: "Select position...",
            vacancies_position_consultant: "Sales Consultant",
            vacancies_position_manager: "Manager",
            vacancies_position_designer: "Designer",
            vacancies_position_photographer: "Photographer",
            vacancies_form_message: "Message / Tell us about yourself",
            vacancies_form_submit: "Submit application",

            // ===== QUIZ =====
            quiz_promo_title: "Find your dream bag",
            quiz_promo_subtitle: "Take a short quiz and get a personal recommendation",
            btn_take_quiz: "Take the quiz",

            // ===== FILTERS =====
            filter_classic: "Classic",
            filter_printed: "Printed",
            // ===== QUIZ =====
quiz_title: "Find Your Bag",
quiz_subtitle: "Answer 4 questions and get personalized recommendations",
quiz_breadcrumb: "QUIZ «FIND YOUR BAG»",

// Шаг 1: Повод
quiz_step1_title: "What occasion do you need a bag for?",
quiz_option_everyday: "Everyday life / work",
quiz_option_evening: "Evening event / occasion",
quiz_option_universal: "Universal (for all occasions)",

// Шаг 2: Стиль
quiz_step2_title: "Which style suits you best?",
quiz_option_classic: "Classic",
quiz_option_printed: "Printed (with pattern)",

// Шаг 3: Размер
quiz_step3_title: "What bag size do you need?",
quiz_option_small: "Small (compact)",
quiz_option_medium: "Medium",
quiz_option_big: "Large (spacious)",

// Шаг 4: Бюджет
quiz_step4_title: "What's your budget?",
quiz_option_low: "Up to 200 BYN",
quiz_option_budget_medium: "200–250 BYN",
quiz_option_high: "250 BYN and above",
quiz_option_any: "Price doesn't matter",

// Кнопки навигации
quiz_btn_back: "← Back",
quiz_btn_next: "Next →",
quiz_btn_catalog: "View Full Catalog",

// Результаты
quiz_result_title: "Here are your perfect bags",
quiz_additional_title: "You might also like these bags:",
            // ===== ADDITIONAL A11Y KEYS =====
            a11y_scheme_1: "Black-white",
            a11y_scheme_2: "Black-green",
            a11y_scheme_3: "White-black",
            a11y_scheme_4: "Beige-brown",
            a11y_scheme_5: "Blue",
            a11y_no_images: "Hide images",
            a11y_reset: "Reset settings",
            a11y_close: "Close",
                        // ===== REVIEWS =====
            reviews_title: "Reviews",
            reviews_title: "Product Reviews",
            review_form_title: "Leave a Review",
            review_placeholder: "Share your impression of the product...",
            btn_publish_review: "Publish Review",
            reviews_empty: "No reviews yet.",
            reviews_be_first: "Be the first!",
            // ===== PRODUCT GRETA MEDIUM =====
            // ===== PRODUCTS (individual) =====
            product_monica_big: "MONICA BIG",
            product_monica_big_title: "MONICA BIG",
            monica_big_desc: "Exquisite geometric shape and bold color solution. Spacious enough for everyday use. Brilliant for evening outings.",
            
            product_monica_small: "MONICA SMALL",
            product_monica_small_title: "MONICA SMALL",
            monica_small_desc: "A brilliant compact model that captivates with its texture and coloring. A winning choice for summer evenings!",
            
           product_greta_medium_title: "GRETA MEDIUM",
            greta_medium_desc: "Square silhouette, soft rounded shapes make this model feminine and attractive. Optimal size for those who don't like bulky bags but want to fit everything they need.",
            greta_desc: "Square silhouette, soft rounded shapes make this model feminine and attractive. The optimal size for those who don't like bulky bags but want to fit everything they need.",
            
            product_black: "BLACK",
            product_black_title: "BLACK",
            black_desc: "Timeless classic in flawless execution. Deep black color and laconic silhouette make this bag a versatile accessory for everyday wear.",
            
            product_blue_dark: "BLUE/DARK",
            product_blue_dark_title: "BLUE/DARK",
            blue_dark_desc: "Noble dark blue shade bordering on black. Elegant classic for evening outings and business meetings.",
            
            product_blue_orange: "BLUE/ORANGE",
            product_blue_orange_title: "BLUE/ORANGE",
            blue_orange_desc: "Bold combination of deep blue and bright orange. This model is for those who aren't afraid to stand out.",
            
            product_snake_1: "SNAKE BAG #1",
            product_snake_1_title: "SNAKE BAG #1",
            snake_1_desc: "Predatory texture and geometric shape. A bag that speaks for itself. The perfect accent for bold looks.",
            
            product_snake_2: "SNAKE BAG #2",
            product_snake_2_title: "SNAKE BAG #2",
            snake_2_desc: "Refined geometry and natural beauty of python skin. A model that will add character to any look.",
            
            product_snake_3: "SNAKE BAG #3",
            product_snake_3_title: "SNAKE BAG #3",
            snake_3_desc: "Stylish and practical model with expressive relief. Perfect for the dynamic city rhythm.",
            
            product_leopard: "LEOPARD",
            product_leopard_title: "LEOPARD",
            leopard_desc: "Bold leopard print and flawless geometry. This model is for those who aren't afraid to be in the spotlight.",
            
            // ===== ABOUT =====
            about_title: "ABOUT THE BRAND",
            about_story_1: "Traveling the world, inspired by different cultures, studying and mastering the most valuable",
            about_story_2: "leather crafting techniques, in 2018 we created the SCALA brand, embodying",
            about_story_3: "authenticity, passion, and freedom of self-expression.",
            about_desc_1: "When creating a new bag model, thinking about color and texture, we envision the image of a modern woman — strong and independent, free from others' judgments, creative, wild in her essence, who despite prejudices changes the world and brings her invaluable contribution to society.",
            about_desc_2: "In turn, we want to show — any woman, wherever she may be, has the legal right to be herself!",
            about_quote: "DON'T LIVE BY THE RULES!<br>CREATE YOUR OWN RULES!",
            about_production: "PRODUCTION",
            production_1: "In the era of rapid technological development and global mechanization, we prefer time-tested production techniques.",
            production_2: "We strive to support and develop manual craftsmanship, build relationships with small family factories, contributing to the preservation of the craft.",
            production_3: "Each of our bags is designed and crafted in Italy by experienced artisans who have been creating leather goods comparable to works of art for generations.",
            production_4: "Quality is never accidental; it is the result of carefully thought-out processes and the work of professionals. We spend a lot of time and effort on developing and improving the design and achieving a high level.",
            about_consumption: "CONSCIOUS CONSUMPTION",
            consumption_1: "We work only with reliable and responsible suppliers from Italy. All reptile leather is supplied with the necessary CITES documents.",
            consumption_2: "We strive for responsible production and call for conscious consumption.",
            about_contacts: "CONTACTS",
            
            // ===== DELIVERY =====
            delivery_title: "DELIVERY",
            delivery_belarus_free: "Free delivery to all regions of Belarus",
            delivery_belarus_time: "Delivery time: 3-5 business days.",
            delivery_cis: "Delivery to CIS countries — 80 BYN",
            delivery_cis_time: "Delivery time specified during checkout.",
            delivery_international: "International delivery",
            delivery_international_desc: "To purchase items with delivery to countries outside the CIS, please use our <a href=\"#\" data-i18n=\"delivery_en_link\">English version of the site</a>.",
            delivery_en_link: "English version",
            delivery_contact_desc: "If you need to make changes or provide additional details, please contact our manager via WhatsApp:",
            delivery_process: "Orders are processed and handed over to the courier service within 1 business day of placement.",
            payment_title: "PAYMENT",
            payment_online: "Product payment is made online on the website.<br>Delivery payment (international, CIS, Belarus) is paid separately by the recipient online.",
            payment_security: "Payment rules and security, information confidentiality.",
            payment_sber: "CARD PAYMENTS PROCESSED VIA SBERBANK PJSC",
            payment_cards: "WE ACCEPT VISA, MASTERCARD, MIR CARDS",
            payment_legal_1: "Online payment service is provided in accordance with the Rules of international payment systems Visa, MasterCard and MIR payment system, based on confidentiality and payment security principles, using the most modern methods of verification, encryption and data transmission over secure channels. Bank card data is entered on the secure payment page of SBERBANK PJSC.",
            payment_legal_2: "On the bank card data entry page, you will need to enter: card number, cardholder name, expiration date, three-digit security code (CVV2 for VISA, CVC2 for MasterCard, Additional Identification Code for MIR). All required data is printed on the card itself. The three-digit security code consists of three digits on the back of the card.",
            payment_legal_3: "You will then be redirected to your bank's page to enter the security code sent to you via SMS. If you haven't received the code, please contact your issuing bank.",
            payment_errors: "<strong>Reasons for payment decline:</strong><br>bank card is not enabled for online payments (contact your bank to check);<br>insufficient funds on the card (contact your issuing bank for details);<br>incorrect card details entered;<br>card has expired (expiration date is printed on the front of the card).",
            payment_support: "For questions about card payments or other website-related inquiries, please contact us at <a href=\"tel:+375292178828\">+375 (29) 217-88-28</a> or <a href=\"mailto:info@scalabag.com\">info@scalabag.com</a>",
            
            // ===== CUSTOM ORDER =====
            custom_title: "CUSTOM ORDER",
            custom_intro: "Our experience, expertise, and access to the finest Italian materials allow us to create any model personally for you — from design development to selecting materials and hardware that may be one-of-a-kind.",
            custom_highlight: "THE BAG BECOMES A UNIQUE AND PERSONAL ACCESSORY THAT HIGHLIGHTS THE INDIVIDUALITY OF THE WOMAN WHO WEARS IT.",
            custom_personalization: "All our products are manufactured at a factory in Italy, so we can fulfill any request from our clients. Each custom-made bag will be personalized with the client's initials, assigned a unique number, and come with a Certificate.",
            custom_form_title: "SUBMIT YOUR REQUEST",
            custom_form_desc: "Fill out the form below, and our manager will contact you to discuss the details of your order.",
            custom_quote: "OUR GOAL — TO CREATE<br>A UNIQUE PRODUCT",
            custom_contact: "For more information about this service, please send your inquiry to <a href=\"mailto:info@scalabag.com\">info@scalabag.com</a>",
            custom_success: "✅ Thank you! Your request has been received. A manager will contact you shortly.",
            
            // ===== CART =====
            cart_title: "YOUR CART",
            cart_empty: "Your cart is empty",
            cart_empty_desc: "Add items from the catalog to place an order",
            cart_continue: "BROWSE CATALOG",
            cart_subtotal: "Subtotal:",
            cart_checkout: "CHECKOUT",
            cart_remove: "Remove",
            cart_qty: "Qty:",
            cart_update: "Update",
            cart_success: "Item added to cart!",
            cart_removed: "Item removed from cart",
            cart_updated: "Cart updated",
            cart_discount: "Discount:",
            cart_discount_applied: "Applied {{value}}% discount",
            
            // ===== ACCOUNT =====
            profile_title: "MY ACCOUNT",
            profile_greeting_default: "Welcome!",
            profile_greeting: "Welcome, ",
            profile_personal: "PERSONAL INFO",
            profile_loyalty: "LOYALTY PROGRAM",
            loyalty_desc: "Make purchases and earn points. Reach 10,000 BYN and receive a limited edition SCÀLA bag!",
            loyalty_progress: "Until gift: ",
            profile_orders: "ORDER HISTORY",
            profile_no_orders: "You have no orders yet.",
            profile_settings: "SETTINGS",
            settings_newsletter: "Receive news and offers via email",
            settings_sms: "Receive order status notifications via SMS",
            btn_edit: "EDIT",
            btn_save: "SAVE SETTINGS",
            notify_settings_saved: "Settings saved!",
            confirm_logout: "Are you sure you want to log out?",
            
            // ===== LOGIN / REGISTER =====
            login_title: "LOGIN",
            login_no_account: "No account?",
            login_register: "Sign up",
            login_email: "Email *",
            login_email_placeholder: "your@email.com",
            login_password: "Password *",
            login_password_placeholder: "••••••••",
            login_remember: "Remember me",
            login_btn: "LOG IN",
            login_forgot: "Forgot password?",
            login_success: "Logged in successfully!",
            login_error: "Invalid email or password",
            
            register_title: "NEW ACCOUNT",
            register_have_account: "Already have an account?",
            register_login: "Log in",
            register_email: "Email *",
            register_email_placeholder: "your@email.com",
            register_password: "Password *",
            register_password_placeholder: "••••••••",
            register_password_confirm: "Confirm password *",
            register_password_confirm_placeholder: "••••••••",
            register_name: "First name *",
            register_name_placeholder: "Your first name",
            register_surname: "Last name *",
            register_surname_placeholder: "Your last name",
            register_phone: "Phone",
            register_phone_placeholder: "+375(29)1234567",
            register_birth: "Date of birth *",
            register_birth_placeholder: "dd-mm-yyyy",
            register_nickname: "Nickname",
            register_nickname_placeholder: "auto_generated",
            register_subscribe: "I want to subscribe to the newsletter to get priority access to sales and be first to know about new arrivals.",
            register_agree: "I have read and agree to the <a href=\"#\" target=\"_blank\">User Agreement</a> *",
            btn_register: "SIGN UP",
            btn_regenerate: "🔄 Regenerate",
            btn_edit_nickname: "✏️ Edit",
            register_success: "Registration successful!",
            
            // ===== VACANCIES =====
            vacancies_title: "VACANCIES",
            vacancy_form_title: "Submit application",
            form_name: "Name *",
            form_name_placeholder: "Your name",
            form_email: "Email *",
            form_email_placeholder: "your@email.com",
            form_phone: "Phone *",
            form_phone_placeholder: "+375(29)1234567",
            form_position: "Position *",
            form_select: "Select...",
            form_message: "Message",
            form_message_placeholder: "Tell us about your experience...",
            form_description: "Order description *",
            form_description_placeholder: "Describe desired model, materials, size, details...",
            form_sketch: "Sketch or reference (optional)",
            form_sketch_placeholder: "Choose file",
            form_sketch_hint: "* Max size: 5MB. Formats: JPG, PNG, PDF",
            form_agree: "I consent to personal data processing",
            btn_submit_vacancy: "SUBMIT APPLICATION",
            btn_submit_custom: "SUBMIT REQUEST",
            vacancy_success: "✅ Application submitted!",
                        // ===== MODAL WINDOWS =====
            modal_added_to_cart: "Item added to cart!",
            modal_added_to_favorites: "Added to favorites!",
            modal_quick_view_title: "Quick View",
            modal_continue_shopping: "Continue shopping",
            modal_go_to_cart: "Go to cart",
            modal_go_to_favorites: "Go to favorites",
            modal_remove_confirm: "Are you sure you want to remove this item?",
            modal_yes: "Yes",
            modal_no: "No",
            modal_success: "Success!",
            modal_error: "Error",
            modal_close: "Close",
            modal_login_required: "You need to log in to do this",
            modal_login_btn: "Log in",
// ===== ADMIN PANEL =====
admin_title: "ADMIN PANEL",
admin_products: "PRODUCTS",
admin_orders: "ORDERS",
admin_vacancies: "VACANCIES",
admin_custom: "CUSTOM ORDERS",
admin_users: "USERS",
admin_settings: "SETTINGS",
admin_data: "DATA MANAGEMENT",
admin_reset_desc: "Clear all site data (cart, favorites, settings, orders)?",
admin_reset_btn: "⚠️ CLEAR ALL DATA",
admin_access_denied: "Access denied",
admin_access_desc: "Only administrators can manage data.",
admin_stats_error: "Failed to load statistics",
admin_no_users: "No users found",
admin_no_orders: "No orders found",
admin_user_name: "Name",
admin_user_email: "Email",
admin_user_role: "Role",
admin_user_registered: "Registered",
admin_order_id: "Order ID",
admin_order_user: "User",
admin_order_total: "Total",
admin_order_status: "Status",
admin_order_date: "Date",
admin_actions: "Actions",
admin_total_users: "Total users",
admin_total_orders: "Total orders",
admin_pending_orders: "Pending",
admin_revenue: "Revenue",
admin_user_updated: "User updated",
admin_user_deleted: "User deleted",
admin_order_updated: "Order status updated",
admin_product_added: "Product added",
admin_product_updated: "Product updated",
admin_product_deleted: "Product deleted",
admin_data_reset: "Data reset",
admin_cannot_delete_self: "Cannot delete yourself",
role_buyer: "Buyer",
role_admin: "Admin",
            
            // ===== WHEEL OF FORTUNE =====
            wheel_title: "🎡 WHEEL OF FORTUNE",
            wheel_desc: "Spin the wheel and get up to 20% off!",
            wheel_spin: "SPIN",
            wheel_spinning: "Spinning...",
            wheel_already_spun: "You already spun the wheel today!",
            wheel_already_spun_btn: "Spun today",
            wheel_result_win: "🎉 Congratulations! {{value}}% discount!",
            wheel_result_lose: "😔 Bad luck, try again next time!",
            wheel_active_discount: "Your active discount: {{value}}%",
            wheel_login_required: "Log in to spin the wheel",
            wheel_note: "* Available to registered users",
            wheel_result_5: "🎉 Congratulations! 5% discount",
            wheel_result_10: "🎉 Congratulations! 10% discount",
            wheel_result_15: "🎉 Congratulations! 15% discount",
            wheel_result_20: "🎉 Congratulations! 20% discount",
            wheel_result_try: "Try again!",
wheel_result_win: "🎉 You won <strong>{{value}}</strong> discount!",
wheel_result_lose: "😔 No discount this time...",
            
            // ===== FOOTER =====
            footer_exchange: "EXCHANGE & RETURN",
            footer_warranty: "WARRANTY & CARE",
            footer_gift: "GIFT CARD",
            footer_subscribe: "SUBSCRIBE TO RECEIVE UPDATES AND EXCLUSIVE OFFERS",
            footer_email_placeholder: "NAME@EMAIL.COM",
            footer_subscribe_btn: "SUBSCRIBE",
            footer_contacts: "CONTACTS",
            footer_offer: "PUBLIC OFFER",
            footer_career: "CAREERS",
            footer_rights: "All rights reserved.",
            
            // ===== COMMON BUTTONS & MESSAGES =====
            btn_buy: "BUY NOW",
            btn_gift: "GIFT HINT",
            btn_details: "DETAILS",
            btn_quick_view: "QUICK VIEW",
            btn_back: "← Home",
            btn_home: "Home",
            btn_catalog: "Catalog",
            btn_clear: "Clear",
            btn_cancel: "Cancel",
            btn_confirm: "Confirm",
            
// ===== ERROR MESSAGES =====
error_required: "Required field",
error_email: "Invalid email",
error_email_exists: "User with this email already exists",
error_password: "Password: 8-20 chars, uppercase, lowercase, digit, special char",
error_password_length: "8-20 characters",              // ✅ NEW
error_password_weak: "Password too weak",              // ✅ NEW
error_password_mismatch: "Passwords don't match",
error_phone: "Format: +375(29)1234567",
error_birth_format: "Format: dd-mm-yyyy",              // ✅ NEW
error_birth_invalid: "Invalid date",                   // ✅ NEW
error_birth_age: "You must be at least 16 years old",  // ✅ NEW
error_name: "Letters, spaces, hyphen only",            // ✅ NEW
error_nickname: "3-20 chars: latin, digits, _",        // ✅ NEW
error_agree: "Consent required",
error_agree_required: "Consent required",
error_form: "Please fix the errors in the form",
error_login: "Invalid email or password",
error_submit: "Error. Please try again later.",
            // ===== NOTIFICATIONS =====
            notify_added: "Item added to cart!",
            notify_removed: "Item removed",
            notify_updated: "Cart updated",
            notify_favorited: "Added to favorites",
            notify_unfavorited: "Removed from favorites",
            notify_settings_saved: "Settings saved!",
            notify_lang_changed: "Language changed to ",
            
            // ===== ACCESSIBILITY =====
            a11y_label: "Accessibility version",
            a11y_font_label: "Font size:",
            a11y_font_small: "A",
            a11y_font_medium: "A+",
            a11y_font_large: "A++",
            a11y_scheme_label: "Color scheme:",
            a11y_scheme_white: "⚪",
            a11y_scheme_black: "⚫⚪",
            a11y_scheme_blue: "🔵🟦",
            a11y_images_toggle: "🖼️ Images",
            a11y_images_show: "🖼️ Show images",
            a11y_images_hide: "🖼️ Hide images",
            a11y_back: "← Standard version"
        }
    },
    
        
    // ===== МЕТОДЫ =====
    
    t(key, params = {}) {
        const dict = this.translations[this.currentLang] || this.translations.ru;
        let text = dict[key] || key;
        
        for (const [param, value] of Object.entries(params)) {
            text = text.replace(new RegExp(`{{${param}}}`, 'g'), value);
        }
        
        return text;
    },
    
    setLanguage(lang) {
        if (!this.translations[lang]) {
            console.warn(`[I18n] Язык "${lang}" не поддерживается`);
            return;
        }
        
        this.currentLang = lang;
        document.documentElement.lang = lang;
        
        // ✅ ИСПРАВЛЕНО: Storage.set() теперь существует
        Storage.set(Storage.keys.LANG, lang);
        
        // Обновляем все элементы с data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = this.t(key);
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.innerHTML = text;
            }
        });
        
        // Обновляем плейсхолдеры с data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });
        
        // Обновляем кнопки языка
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
            btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
        });
        
        // Уведомление о смене языка
        if (typeof showNotification === 'function') {
            showNotification(this.t('notify_lang_changed') + (lang === 'ru' ? 'русский' : 'English'));
        }
    },
    
    // ✅ ИСПРАВЛЕНО: init() теперь async и использует await
 async init() {
    // ✅ Читаем язык из localStorage, а не с сервера!
    const savedLang = localStorage.getItem('scala_lang') || 'ru';
    this.setLanguage(savedLang);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            this.setLanguage(btn.dataset.lang);
            localStorage.setItem('scala_lang', btn.dataset.lang);
        });
    });
}
};

// ===== ЭКСПОРТ =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18n;
}

// ===== АВТО-ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
    I18n.init();
});