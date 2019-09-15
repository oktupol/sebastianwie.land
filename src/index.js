import './assets/scss/style.scss';
import { Title } from './classes/Title';
import { TitleKeyboardListener } from './classes/TitleKeyboardListener';

let title = new Title(document, document.getElementById('title'));
title.init();
let keyboardListener = new TitleKeyboardListener(document, title);