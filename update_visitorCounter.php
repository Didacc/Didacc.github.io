<?php
$counterFile = 'visitorCounter.txt';

// Read the current count
$count = (int)file_get_contents($counterFile);

// Increment the count
$count++;

// Write the updated count back to the file
file_put_contents($counterFile, $count);

// Return the count as JSON
echo json_encode(['count' => $count]);
?>
