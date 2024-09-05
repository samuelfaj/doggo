

const loadStatic = async (app: any) => {
	app.get("/health", (context: any) => {
		console.log("Health check", context);
		return { status: "OK" };
	});

	return app;
};

export default loadStatic;
