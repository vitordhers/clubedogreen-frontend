import spaceman from '../assets/spaceman.png';
import roletaBrasileira from '../assets/roleta_brasileira.png';
import mines from '../assets/mines.png';
import blazeDouble from '../assets/blaze_double.png';

import spacemanHor from '../assets/spaceman-hor.png';
import roletaBrasileiraHor from '../assets/roleta-hor.png';
import minesHor from '../assets/mines-hor.png';
import blazeDoubleHor from '../assets/blaze-hor.png';

export const gamesData = [
	{
		img: roletaBrasileira,
        img2: roletaBrasileiraHor,
		name: 'Roleta brasileira',
		url: 'roleta-brasileira',
		botToken: '5938257780:AAHJDLoiju7OfVRDN7jnWO4ricmjGj6YuGU',
		chatId: '-1001878043093',
	},
	{
		img: spaceman,
        img2: spacemanHor,
		name: 'Spaceman',
		url: 'spaceman',
		botToken: '5924739023:AAH3JVIDfTncmLwh3v2-uzKWk2SkZ_YICIg',
		chatId: '-1001655875813',
	},
	{
		img: mines,
        img2: minesHor,
		name: 'Mines',
		url: 'mines',
		botToken: '5981425862:AAEmi2NlMPDVFY0madQ-x8HPd7lT4i7OLwA',
		chatId: '-1001623050766',
	},
	{
		img: blazeDouble,
        img2: blazeDoubleHor,
		name: 'Blaze',
		url: 'blazedouble',
		botToken: '6117715321:AAHVhWujMW2soy3C3n2kaGgi9J0vn0PoYz0',
		chatId: '-1001701906513',
	},
];

const rooms = [
	{ id: -1001878043093, title: 'Canal-Roleta', type: 'channel' },
	{ id: -1001655875813, title: '[VIP] SPACEMAN KIEV', type: 'channel' },
	{
		id: -1001623050766,
		title: '💰 Mines do Pix - Gratuito💰',
		username: 'minesdopix',
		type: 'channel',
	},
];
