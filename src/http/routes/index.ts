import v1 from '@http/routes/v1';

const loadStatic = async (app: any) => {
	app.get('/health', () => ({ status: 'OK' })).use(v1);
	
	return app;
};

export default loadStatic;
