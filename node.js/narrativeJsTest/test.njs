function runTests() {
	var now = new Date().getTime();
	sleep->(1000);
	// sad but true: Firefox doesn't guarantee that the specified amount of
	// time has passed.
	assert(new Date().getTime() - now >= 900, "sleep sleeps");
}