<?php
if (!isset($_REQUEST["url"])) die("404");

$url = $_REQUEST["url"];

$input = @file_get_contents($url); //local: cache.txt or remote: https://goo.gl/photos/CjrFuCNGhCoQnC2YA");
file_put_contents("cache.txt", $input); //save a copy in cache

$regexp = '(https:\/\/)(.*)(\")'; //was: $regexp = '(https:\/\/lh3.googleusercontent.com)(.*)(\")';

if(preg_match_all("/$regexp/siU", $input, $matches, PREG_SET_ORDER)) {

	foreach ($matches as $match) {
		$url = $match[1] . $match[2];
		if (strlen($url)==110) {
			$photo = [];
			$photo["thumb"] = $url;
			$photo["large"] = $url . "=w1007";
			$photos[] = $photo;
		}
	}
}

//result
$result = [];
$result["photos"] = $photos;
echo json_encode($result);

