<?php

/**
 * sitemap
 *
 * @since 1.2.1
 * @deprecated 2.0.0
 *
 * @package Redaxscript
 * @category Modules
 * @author Henry Ruhs
 *
 * @return string
 */

function sitemap()
{
	/* query categories */

	$categories_query = 'SELECT id, title, alias, description, access FROM ' . PREFIX . 'categories WHERE (language = \'' . LANGUAGE . '\' || language = \'\') && status = 1 && parent = 0 ORDER BY rank ASC';
	$categories_result = Redaxscript\Db::forTablePrefix('categories')->rawQuery($categories_query)->findArray();
	$categories_num_rows = count($categories_result);

	/* collect output */

	$output = form_element('fieldset', '', 'set_sitemap', '', '', '<span class="title_content_sub title_sitemap_sub">' . l('categories') . '</span>') . '<ul class="list_default list_sitemap">';
	if ($categories_result == '' || $categories_num_rows == '')
	{
		$categories_error = l('category_no') . l('point');
	}
	else if ($categories_result)
	{
		$accessValidator = new Redaxscript\Validator\Access();
		foreach ($categories_result as $r)
		{
			$access = $r['access'];

			/* if access granted */

			if ($accessValidator->validate($access, MY_GROUPS) === Redaxscript\Validator\Validator::PASSED)
			{
				if ($r)
				{
					foreach ($r as $key => $value)
					{
						$$key = stripslashes($value);
					}
				}
				if ($description == '')
				{
					$description = $title;
				}

				/* collect item output */

				$output .= '<li>' . anchor_element('internal', '', '', $title, $alias, $description);

				/* collect children list output */

				ob_start();
				navigation_list('categories', array(
					'parent' => $id,
					'class' => 'list_children'
				));
				navigation_list('articles', array(
					'parent' => $id,
					'class' => 'list_children'
				));
				$output .= ob_get_clean();
				$output .= '</li>';
			}
			else
			{
				$categories_counter++;
			}
		}

		/* handle access */

		if ($categories_num_rows == $categories_counter)
		{
			$categories_error = l('access_no') . l('point');
		}
	}

	/* handle error */

	if ($categories_error)
	{
		$output .= '<li>' . $categories_error . '</li>';
	}
	$output .= '</ul></fieldset>';

	/* query articles */

	$articles_query = 'SELECT id, title, alias, description, access FROM ' . PREFIX . 'articles WHERE (language = \'' . LANGUAGE . '\' || language = \'\') && status = 1 && category = 0 ORDER BY rank ASC';
	$articles_result = Redaxscript\Db::forTablePrefix('categories')->rawQuery($articles_query)->findArray();
	$articles_num_rows = count($articles_result);

	/* collect output */

	$output .= form_element('fieldset', '', 'set_sitemap', '', '', '<span class="title_content_sub title_sitemap_sub">' . l('uncategorized') . '</span>') . '<ul class="list_default list_sitemap">';
	if ($articles_result == '' || $articles_num_rows == '')
	{
		$articles_error = l('article_no') . l('point');
	}
	else if ($articles_result)
	{
		foreach ($articles_result as $r)
		{
			$access = $r['access'];
			$check_access = $accessValidator->validate($access, MY_GROUPS);

			/* if access granted */

			if ($accessValidator->validate($access, MY_GROUPS) === Redaxscript\Validator\Validator::PASSED)
			{
				if ($r)
				{
					foreach ($r as $key => $value)
					{
						$$key = stripslashes($value);
					}
				}
				if ($description == '')
				{
					$description = $title;
				}

				/* collect item output */

				$output .= '<li>' . anchor_element('internal', '', '', $title, $alias, $description) . '</li>';
			}
			else
			{
				$articles_counter++;
			}
		}

		/* handle access */

		if ($articles_num_rows == $articles_counter)
		{
			$articles_error = l('access_no') . l('point');
		}
	}

	/* handle error */

	if ($articles_error)
	{
		$output .= '<li>' . $articles_error . '</li>';
	}
	$output .= '</ul></fieldset>';
	return $output;
}
