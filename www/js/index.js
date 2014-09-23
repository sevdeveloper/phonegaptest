/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

//Функция выполнения запроса на прокси-скрипт
function reqYaTcy(sitename)
{
	if(sitename=='')
	{
		//Не будем делать запрос с пустым менем сайта
		alert('Не указано имя сайта!');
	} else
	{
		myVibrate(80); //Приятная вибрация
		
		//Показываем стилизованный Loader во время запроса
		$.mobile.loading( "show", {
            text: 'Загрузка...',
            textVisible: true,
			textonly: false,
			theme: 'b',
		});
	
		//Формируем AJAX-запрос
		$.ajax({
			crossDomain: true, //обращаемся к внешнему ресурсу
			type: 'GET', //Наш PHP-скрипт принимает только GET-запросы
			//URL нашего PHP-скрипта-прокси c GET-параметром
			url: 'http://multisrv.odca.net/index.php?purl='+encodeURIComponent('http://bar-navig.yandex.ru/u?url=' + sitename + '&show=1'),
			dataType: "text",
			success: function(data, textStatus, jqXHR ) { //Успех
				$.mobile.loading( "hide" ); //Скрываем Loader
				myVibrate(80); //Приятная вибрация
				//Парсим полученный XML и выводим значение ТИЦ в нативном окне
				alert('ТИЦ = ' + $(data).find('tcy').attr('value'));
				$("#debugdiv").html(data);
			},
			error: function(data,text,err) { //Неудача
				$.mobile.loading( "hide" ); //Скрываем Loader
				alert('Ошибка: '+ err); //Выводим ошибку в нативном окне
			},
		});
	}
		
};

//Функция очистки поля ввода
function clearInput()
{
	$('#textbasic').val('');
	myVibrate(80); //Приятная вибрация
};

//Функция вибрации устройства
function myVibrate(time)
{
	//navigator.vibrate();
	navigator.notification.vibrate(time);
};