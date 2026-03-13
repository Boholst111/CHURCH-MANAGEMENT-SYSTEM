<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#3b82f6">
    <meta name="description" content="Mahayahay Free Methodist Church Management System - A comprehensive solution for church administration">
    
    <title>Church Management System</title>
    
    <!-- Favicon -->
    <link rel="icon" href="<?php echo e(asset('favicon.ico')); ?>">
    <link rel="apple-touch-icon" href="<?php echo e(asset('logo192.png')); ?>">
    <link rel="manifest" href="<?php echo e(asset('manifest.json')); ?>">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    
    <!-- Styles -->
    <link rel="stylesheet" href="<?php echo e(mix('css/app.css')); ?>">
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    
    <!-- Feature Flags -->
    <script>
        window.__FEATURE_FLAGS__ = <?php echo json_encode(\App\Helpers\FeatureFlag::getAllFlags(), 15, 512) ?>;
    </script>
    
    <!-- Scripts -->
    <script src="<?php echo e(mix('js/app.js')); ?>"></script>
</body>
</html>
<?php /**PATH C:\PARE\CEBRANO_BOHOLST_IPT2\resources\views/app.blade.php ENDPATH**/ ?>