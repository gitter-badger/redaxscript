<?php
namespace Redaxscript\Modules\WebApp;

use Redaxscript\Module;
use Redaxscript\Registry;

/**
 * web application support
 *
 * @since 2.2.0
 *
 * @package Redaxscript
 * @category Modules
 * @author Henry Ruhs
 */

class WebApp extends Module
{
	/**
	 * custom module setup
	 *
	 * @var array
	 */

	protected static $_module = array(
		'name' => 'Web App',
		'alias' => 'WebApp',
		'author' => 'Redaxmedia',
		'description' => 'Web application support',
		'version' => '2.2.0',
		'status' => 1,
		'access' => 0
	);

	/**
	 * loaderStart
	 *
	 * @since 2.2.0
	 */

	public static function loaderStart()
	{
		global $loader_modules_scripts;
		$loader_modules_scripts[] = 'modules/WebApp/scripts/startup.js';
		$loader_modules_scripts[] = 'modules/WebApp/scripts/web_app.js';
	}

	/**
	 * renderStart
	 *
	 * @since 2.2.0
	 */

	public static function renderStart()
	{
		if (Registry::get('firstParameter') === 'manifest_webapp')
		{
			header('content-type: application/x-web-app-manifest+json');
			include_once('modules/web_app/files/manifest.json');
			Registry::set('renderBreak', 1);
		}
	}

	/**
	 * headStart
	 *
	 * @since 2.2.0
	 */

	public static function headStart()
	{
		$output = '<meta name="apple-mobile-web-app-capable" content="yes">' . PHP_EOL;
		echo $output;
	}

	/**
	 * headEnd
	 *
	 * @since 2.2.0
	 */

	public static function headEnd()
	{
		$output = '<link href="' . ROOT . '/modules/web_app/images/icon.png" rel="apple-touch-icon-precomposed" />' . PHP_EOL;
		echo $output;
	}
}
