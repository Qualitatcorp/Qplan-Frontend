<!DOCTYPE html>
<html lang="es" ng-app="do">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="/img/favicon.ico" rel="shortcut icon">
	<title>Qualitatcorp - Alfabetización Digital</title>
<!-- injector:css -->
<!-- endinjector -->
<!--[if lt IE 9]>
<script src="node_modules/video.js/dist/ie8/videojs-ie8.min.js"></script>
<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
</head>
<body>
	<div class="container">
		<ng-view></ng-view>
	</div>
	<div ng-controller="do.authCtrl"></div>
<!-- injector:js -->
<!-- endinjector -->
</body>
</html>