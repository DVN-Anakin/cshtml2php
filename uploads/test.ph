<body>
    <div id="page">
        <h1>$title</h1>
        <ul>
            $foreach ($fruits as $fruit => $color) {
                <li style="color: $color;">
                    $(ucwords($fruit))
                    $if ($color == "green") {
                        <strong>- Meh.</strong>
                    } else if($color == "orange") {
                        <strong>- Yum!</strong>
                    }
                </li>
            }
        </ul>
        <p>All these fruits together will cost $$100.</p>
    </div>
</body>
</html>