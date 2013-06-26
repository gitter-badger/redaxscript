<?php

/**
 * helper class
 */

function helper_class()
{
	$output = MY_BROWSER . MY_BROWSER_VERSION;
	if (MY_ENGINE)
	{
		if ($output)
		{
			$output .= ' ';
		}
		$output .= MY_ENGINE;
	}
	if ($output)
	{
		$output .= ' ';
	}
	if (MY_MOBILE)
	{
		$output .= 'mobile ' . MY_MOBILE;
	}
	else
	{
		$output .= 'desktop';
	}
	if (LANGUAGE == 'ar' || LANGUAGE == 'fa' || LANGUAGE == 'he')
	{
		if ($output)
		{
			$output .= ' ';
		}
		$output .= 'rtl';
	}
	echo $output;
}

/**
 * helper subset
 */

function helper_subset()
{
	if (LANGUAGE == 'bg' || LANGUAGE == 'ru')
	{
		$output = 'cyrillic';
	}
	else if (LANGUAGE == 'vi')
	{
		$output = 'vietnamese';
	}
	else
	{
		$output = 'latin';
	}
	echo $output;
}
?>