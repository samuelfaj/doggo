 const loadStatic = async (app: any) => {
	app.get("/", () => "Doggo Framework")
	
	return app
}
 
 export default loadStatic;
