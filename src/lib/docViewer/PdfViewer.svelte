<script lang="ts">
	export let pdfData;
</script>

<iframe title="PDF Viewer" width=100% height="100%"
				srcdoc={`
			<html lang="en">
				<head>
					<title>Embedded PDF</title>
					<style>
						body {
							margin: 0;
						}
						iframe {
							display: block;
							width: 100%;
							height: 100vh;
							border: none;
						}
					</style>
				</head>
				<body>
					<iframe src="data:application/pdf;base64,${pdfData}"></iframe>
				</body>
			</html>
		`}>
</iframe>