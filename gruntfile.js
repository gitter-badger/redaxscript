module.exports = function (grunt)
{
	'use strict';

	/* config grunt */

	grunt.initConfig(
	{
		version: grunt.file.readJSON('package.json').version,
		jshint:
		{
			dependency:
			{
				src:
				[
					'gruntfile.js'
				]
			},
			base:
			{
				src:
				[
					'scripts/*.js'
				]
			},
			modules:
			{
				src:
				[
					'modules/*/scripts/*.js'
				]
			},
			templates:
			{
				src:
				[
					'templates/*/scripts/*.js'
				]
			},
			options:
			{
				jshintrc: '.jshintrc'
			}
		},
		jsonlint:
		{
			dependency:
			{
				src:
				[
					'composer.json',
					'package.json'
				]
			},
			languages:
			{
				src:
				[
					'languages/*.json'
				]
			},
			modules:
			{
				src:
				[
					'modules/**/*.json'
				]
			},
			provider:
			{
				src:
				[
					'tests/provider/*.json'
				]
			}
		},
		csslint:
		{
			base:
			{
				src:
				[
					'styles/*.css'
				]
			},
			modules:
			{
				src:
				[
					'modules/*/styles/*.css'
				]
			},
			templates:
			{
				src:
				[
					'templates/*/styles/*.css'
				]
			},
			options:
			{
				csslintrc: '.csslintrc'
			}
		},
		htmlhint:
		{
			modules:
			{
				src:
				[
					'modules/**/*.phtml'
				]
			},
			templates:
			{
				src:
				[
					'templates/**/*.phtml'
				]
			},
			options:
			{
				htmlhintrc: '.htmlhintrc'
			}
		},
		phpcs:
		{
			root:
			{
				dir:
				[
					'Config.php',
					'index.php',
					'install.php'
				]
			},
			base:
			{
				dir:
				[
					'includes',
					'scripts',
					'styles'
				]
			},
			languages:
			{
				dir:
				[
					'languages'
				]
			},
			modules:
			{
				dir:
				[
					'modules'
				]
			},
			templates:
			{
				dir:
				[
					'templates'
				]
			},
			tests:
			{
				dir:
				[
					'tests'
				]
			},
			options:
			{
				bin: 'vendor/bin/phpcs',
				standard: 'ruleset.xml'
			}
		},
		qunit:
		{
			jquery:
			{
				options:
				{
					urls:
					[
						'http://develop.redaxscript.com/qunit.default'
					]
				}
			},
			zepto:
			{
				options:
				{
					urls:
					[
						'http://develop.redaxscript.com/qunit.zepto'
					]
				}
			}
		},
		phpunit:
		{
			development:
			{
				dir: 'tests/includes'
			},
			integration:
			{
				dir: 'tests/includes',
				options:
				{
					coverageHtml: 'clover',
					coverageClover: 'clover.xml'
				}
			},
			options:
			{
				bin: 'vendor/bin/phpunit',
				bootstrap: 'tests/Bootstrap.php'
			}
		},
		autoprefixer:
		{
			base:
			{
				src:
				[
					'styles/*.css'
				]
			},
			modules:
			{
				src:
				[
					'modules/*/styles/*.css'
				]
			},
			templates:
			{
				src:
				[
					'templates/*/styles/*.css'
				]
			},
			options:
			{
				browsers:
				[
					'last 2 Android versions',
					'last 2 iOS versions',
					'last 2 Chrome versions',
					'last 3 Explorer versions',
					'last 2 Firefox versions',
					'last 2 Opera versions',
					'last 2 Safari versions'
				]
			}
		},
		shell:
		{
			tocBase:
			{
				command: 'sh vendor/bin/tocgen.sh scripts .tocgen && sh vendor/bin/tocgen.sh styles .tocgen'
			},
			tocModules:
			{
				command: 'sh vendor/bin/tocgen.sh modules .tocgen'
			},
			tocTemplates:
			{
				command: 'sh vendor/bin/tocgen.sh templates .tocgen'
			},
			toclintBase:
			{
				command: 'sh vendor/bin/tocgen.sh scripts .tocgen -l && sh vendor/bin/tocgen.sh styles .tocgen -l'
			},
			toclintModules:
			{
				command: 'sh vendor/bin/tocgen.sh modules .tocgen -l'
			},
			toclintTemplates:
			{
				command: 'sh vendor/bin/tocgen.sh templates .tocgen -l'
			},
			apiBase:
			{
				command: 'php vendor/bin/apigen --template-config vendor/redaxmedia/redaxscript-apigen-template/config.neon --php no --source Config.php --source includes --destination ../redaxscript-api/base'
			},
			apiModules:
			{
				command: 'php vendor/bin/apigen --template-config vendor/redaxmedia/redaxscript-apigen-template/config.neon --php no --source modules --destination ../redaxscript-api/modules'
			},
			apiTests:
			{
				command: 'php vendor/bin/apigen --template-config vendor/redaxmedia/redaxscript-apigen-template/config.neon --php no --source tests --destination ../redaxscript-api/tests'
			},
			addUpstream:
			{
				command: 'git remote add upstream git://github.com/redaxmedia/redaxscript.git'
			},
			pullUpstream:
			{
				command: 'git pull upstream master && git pull upstream develop'
			},
			removeUpstream:
			{
				command: 'git remote rm upstream'
			},
			options:
			{
				stdout: true,
				failOnError: true
			}
		},
		copy:
		{
			distFull:
			{
				src:
				[
					'<%=compress.distFull.src%>'
				],
				dest: '../redaxscript-dist/export/redaxscript_<%= version %>_full',
				expand: true
			},
			distLite:
			{
				src:
				[
					'<%=compress.distLite.src%>'
				],
				dest: '../redaxscript-dist/export/redaxscript_<%= version %>_lite',
				expand: true
			}
		},
		compress:
		{
			distFull:
			{
				src:
				[
					'includes/**',
					'languages/**',
					'libraries/**',
					'modules/**',
					'templates/**',
					'Config.php',
					'index.php',
					'install.php',
					'README.md'
				],
				options:
				{
					archive: '../redaxscript-dist/files/releases/redaxscript_<%= version %>_full.zip'
				}
			},
			distLite:
			{
				src:
				[
					'includes/**',
					'languages/en.json',
					'libraries/**',
					'modules/call_home/**',
					'templates/admin/**',
					'templates/default/**',
					'templates/install/**',
					'Config.php',
					'index.php',
					'install.php',
					'README.md'
				],
				options:
				{
					archive: '../redaxscript-dist/files/releases/redaxscript_<%= version %>_lite.zip'
				}
			},
			distLanguages:
			{
				src:
				[
					'languages/*.json',
				],
				dest: '../redaxscript-dist/files',
				ext: '.zip',
				expand: true
			},
			distModulesAnalytics:
			{
				src:
				[
					'modules/Analytics/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/analytics.zip'
				}
			},
			distModulesArchive:
			{
				src:
				[
					'modules/archive/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/archive.zip'
				}
			},
			distModulesCallHome:
			{
				src:
				[
					'modules/CallHome/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/call_home.zip'
				}
			},
			distModulesContact:
			{
				src:
				[
					'modules/contact/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/contact.zip'
				}
			},
			distModulesDawanda:
			{
				src:
				[
					'modules/Dawanda/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/dawanda.zip'
				}
			},
			distModulesDisqus:
			{
				src:
				[
					'modules/Disqus/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/disqus.zip'
				}
			},
			distModulesEditor:
			{
				src:
				[
					'modules/Editor/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/editor.zip'
				}
			},
			distModulesFBGroup:
			{
				src:
				[
					'modules/fb_group/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/fb_group.zip'
				}
			},
			distModulesFeedGenerator:
			{
				src:
				[
					'modules/feed_generator/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/feed_generator.zip'
				}
			},
			distModulesFeedReader:
			{
				src:
				[
					'modules/feed_reader/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/feed_reader.zip'
				}
			},
			distModulesFileManager:
			{
				src:
				[
					'modules/file_manager/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/file_manager.zip'
				}
			},
			distModulesGallery:
			{
				src:
				[
					'modules/gallery/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/gallery.zip'
				}
			},
			distModulesGetFile:
			{
				src:
				[
					'modules/get_file/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/get_file.zip'
				}
			},
			distModulesGithubTracker:
			{
				src:
				[
					'modules/github_tracker/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/github_tracker.zip'
				}
			},
			distModulesLazyLoad:
			{
				src:
				[
					'modules/lazy_load/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/lazy_load.zip'
				}
			},
			distModulesLiveReload:
			{
				src:
				[
					'modules/LiveReload/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/live_reload.zip'
				}
			},
			distModulesMaps:
			{
				src:
				[
					'modules/Maps/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/maps.zip'
				}
			},
			distModulesMultiLanguage:
			{
				src:
				[
					'modules/MultiLanguage/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/multi_language.zip'
				}
			},
			distModulesPreview:
			{
				src:
				[
					'modules/Preview/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/preview.zip'
				}
			},
			distModulesQunit:
			{
				src:
				[
					'modules/qunit/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/qunit.zip'
				}
			},
			distModulesRecentView:
			{
				src:
				[
					'modules/recent_view/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/recent_view.zip'
				}
			},
			distModulesShareThis:
			{
				src:
				[
					'modules/ShareThis/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/share_this.zip'
				}
			},
			distModulesSitemap:
			{
				src:
				[
					'modules/sitemap/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/sitemap.zip'
				}
			},
			distModulesSitemapXML:
			{
				src:
				[
					'modules/sitemap_xml/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/sitemap_xml.zip'
				}
			},
			distModulesValidator:
			{
				src:
				[
					'modules/Validator/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/validator.zip'
				}
			},
			distModulesWebApp:
			{
				src:
				[
					'modules/WebApp/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/modules/web_app.zip'
				}
			},
			distTemplatesCandy:
			{
				src:
				[
					'templates/candy/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/templates/candy.zip'
				}
			},
			distTemplatesScratch:
			{
				src:
				[
					'templates/scratch/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/templates/scratch.zip'
				}
			},
			distTemplatesTwitter:
			{
				src:
				[
					'templates/twitter/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/templates/twitter.zip'
				}
			},
			distTemplatesWide:
			{
				src:
				[
					'templates/wide/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/templates/wide.zip'
				}
			},
			distTemplatesZepto:
			{
				src:
				[
					'templates/zepto/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/templates/zepto.zip'
				}
			},
			distSQL:
			{
				src:
				[
					'../redaxscript-sql/<%= version %>/*.sql'
				],
				dest: '../redaxscript-dist/files/sql',
				expand: true
			},
			distMediaLogos:
			{
				src:
				[
					'../redaxscript-media/logos/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/media/logos.zip'
				}
			},
			distMediaScreenshots:
			{
				src:
				[
					'../redaxscript-media/screenshots/**'
				],
				options:
				{
					archive: '../redaxscript-dist/files/media/screenshots.zip'
				}
			}
		},
		jsonmin:
		{
			dependency:
			{
				src:
				[
					'composer.lock'
				],
				dest: 'composer.lock'
			}
		},
		img:
		{
			modules:
			{
				src:
				[
					'modules/*/images/*.gif',
					'modules/*/images/*.jpg',
					'modules/*/images/*.png'
				]
			},
			templates:
			{
				src:
				[
					'templates/*/images/*.gif',
					'templates/*/images/*.jpg',
					'templates/*/images/*.png'
				]
			}
		},
		smushit:
		{
			modules:
			{
				src:
				[
					'<%=img.modules.src%>'
				]
			},
			templates:
			{
				src:
				[
					'<%=img.templates.src%>'
				]
			}
		},
		svgmin:
		{
			modules:
			{
				src:
				[
					'modules/*/images/*.svg'
				],
				expand: true
			},
			templates:
			{
				src:
				[
					'templates/*/images/*.svg'
				],
				expand: true
			},
			options:
			{
				plugins:
				[
					{
						removeViewBox: false
					}
				]
			}
		},
		watch:
		{
			phpunit:
			{
				files:
				[
					'includes/**/*.php',
					'tests/**/*.php',
					'tests/**/*.json'
				],
				tasks:
				[
					'phpunit:development'
				]
			}
		}
	});

	/* load tasks */

	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-htmlhint');
	grunt.loadNpmTasks('grunt-img');
	grunt.loadNpmTasks('grunt-jsonlint');
	grunt.loadNpmTasks('grunt-jsonmin');
	grunt.loadNpmTasks('grunt-phpcs');
	grunt.loadNpmTasks('grunt-phpunit');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-smushit');
	grunt.loadNpmTasks('grunt-svgmin');

	/* register tasks */

	grunt.registerTask('default',
	[
		'jshint',
		'jsonlint',
		'csslint',
		'htmlhint',
		'phplint',
		'toclint'
	]);
	grunt.registerTask('phplint',
	[
		'phpcs'
	]);
	grunt.registerTask('toclint',
	[
		'shell:toclintBase',
		'shell:toclintModules',
		'shell:toclintTemplates'
	]);
	grunt.registerTask('toc',
	[
		'shell:tocBase',
		'shell:tocModules',
		'shell:tocTemplates'
	]);
	grunt.registerTask('api',
	[
		'shell:apiBase',
		'shell:apiModules',
		'shell:apiTests'
	]);
	grunt.registerTask('sync',
	[
		'shell:addUpstream',
		'shell:pullUpstream',
		'shell:removeUpstream'
	]);
	grunt.registerTask('optimize',
	[
		'autoprefixer',
		'toc',
		'jsonmin',
		'img',
		'smushit',
		'svgmin'
	]);
	grunt.registerTask('integration',
	[
		'default',
		'phpunit:integration'
	]);
	grunt.registerTask('dist',
	[
		'copy:distFull',
		'copy:distLite',
		'compress'
	]);
};
