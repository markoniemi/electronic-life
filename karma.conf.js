'use strict';

module.exports = function(karma) {
	karma.set({
		frameworks : [ 'jasmine', 'browserify', 'sinon' ],
		files : [ 'test*/**/*.js' ],
		reporters : [ 'dots', 'coverage', 'coveralls', 'junit' ],
		preprocessors : {
			'test*/**/*.js' : [ 'browserify' ],
			'app*/**/*.js' : [ 'browserify' ]
		},
//		browsers : [ 'Chrome' ],
		browsers : [ 'PhantomJS' ],
		// logLevel: 'LOG_DEBUG',
		singleRun : true,
		autoWatch : false,
		// browserify configuration
		browserify : {
			debug : true,
			transform : [ 'brfs', 'browserify-shim', 'browserify-istanbul' ]
		},
    junitReporter : {
      outputDir : 'reports/test',
      useBrowserName : false
    },
    coverageReporter : {
      type : 'lcov',
      dir : 'reports',
      subdir : 'coverage',
      file : 'lcov.info',
      useBrowserName : false
    }
  });
};
