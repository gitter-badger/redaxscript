<?php
namespace Redaxscript;

use PDO;
use PDOException;

/* include as needed */

include_once('includes/Autoloader.php');

/* init */

Autoloader::init();
Request::init();

/* registry and config */

$registry = Registry::getInstance();
$config = Config::getInstance();

/* database */

Db::init($config);

/* test database */

try
{
	if ($config->get('type') === Db::getDb()->getAttribute(PDO::ATTR_DRIVER_NAME))
	{
		$registry->set('dbConnect', true);
	}
}

/* catch pdo exception */

catch (PDOException $exception)
{
	$registry->set('dbException', $exception->getMessage());
}

/* startup and migrate constants */

startup();
$registry->init(migrate_constants());

/* hook */

if ($registry->get('file') !== 'install.php')
{
	Hook::init($registry);
}

/* detector */

$detectorLanguage = new Detector\Language($registry);
$detectorTemplate = new Detector\Template($registry);

/* set language and template */

$registry->set('language', $detectorLanguage->getOutput());
$registry->set('template', $detectorTemplate->getOutput());

/* language */

$language = Language::getInstance();
$language->init($registry->get('language'));

/* define deprecated constants */

define('LANGUAGE', $detectorLanguage->getOutput());
define('TEMPLATE', $detectorTemplate->getOutput());