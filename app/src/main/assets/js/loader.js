var groups = [
	{
		name: 'official', //0
		title: 'Официальное'
	}, {
		name: 'trade',    //1
		title: 'Торговля'
	}, {
		name: 'social',   //2
		title: 'Социальное'
	}, {
		name: 'other',    //3
		title: 'Разное'
	}
];

var resources = [
	{
		title: 'Официальный сайт MFCoin',
		url: 'https://mfcoin.net',
		group: 0
	}, {
		title: 'Официальный сайт Freeland',
		url: 'https://freeland.land',
		group: 0
	}, {
		title: 'Личный кабинет',
		url: 'https://profile.mfcoin.net',
		group: 0
	}, {
		title: 'Crex24',
		url: 'https://crex24.com/exchange/MFC-BTC',
		group: 1
	}, {
		title: 'Stex',
		url: 'https://app.stocks.exchange/ru/basic-trade/pair/BTC/MFC/1M',
		group: 1
	}, {
		title: 'MFC Trade',
		url: 'https://web.telegram.org/#/im?p=@mfc_trade',
		group: 1
	}, {
		title: 'MFCoin Escrow',
		url: 'https://bazar.mfcoin.net',
		group: 1
	}, {
		title: 'Чат Freeland [RU]',
		url: 'https://web.telegram.org/#/im?p=@mfcoinru',
		group: 2
	}, {
		title: 'Чат Freeland [EN]',
		url: 'https://web.telegram.org/#/im?p=@mfcoinen',
		group: 2
	}, {
		title: 'Форум',
		url: 'https://forum.mfcoin.net',
		group: 2
	}, {
		title: 'Голосования',
		url: 'https://vote.mfcoin.su',
		group: 2
	}, {
		title: 'Все ресурсы',
		url: 'https://pages.freeland.land',
		group: 3
	}
];

var step = 1;
var steps = resources.length

function check_step_next() {
	if(step <= steps) {
		//не работает! cross-domain запрос
		//задумка в том, чтобы проверить доступность сайта
		$.ajax({
			url: resources[step].url,
			timeout: 1500
		})
		.done(function(){
			step++;
			check_step_next();
		})
		.fail(function(){
			step++;
			$("#loading-info").text(resources[step].title + " недоступен..");
			check_step_next();
		});
	} else {
		$("#loading-info").text("Проверка завершена");
		$(".loading#main").hide();
	}
}

function loading_check(host) {
	$("#loading-info").text("Проверяю доступность сервисов..");
	check_step_next();
}

$(document).ready(function(){
	loading_check();
});
