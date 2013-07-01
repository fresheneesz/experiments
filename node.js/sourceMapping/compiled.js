//#sourceMappingURL=original.sourcemap.json
require('source-map-support').install();

throw new Error("test");

// This format works in intelliJ!!!!
// Note that intelliJ does *not* recognize # but does recognize single // comments
/*
//@ sourceMappingURL=original.sourcemap.json
*/