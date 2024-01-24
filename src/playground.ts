import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import sequelize from '@configs/sequelize';
import ApiUtils from '@utils/Api.utils';
import { cors } from '@elysiajs/cors';
import WhatsAppRobot from './robot/WhatsAppRobot';

console.log('🚀 Sequelize initialized', `(${sequelize.options.host})`);

WhatsAppRobot.init();
