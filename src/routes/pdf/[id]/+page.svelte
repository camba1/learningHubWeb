<script lang="ts">
	export let data;
</script>

<div class="grid grid-cols-2 gap-4">
	<iframe title="PDF Viewer" width=100% height="315"
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
					<iframe src="data:application/pdf;base64,${data.body.pdfData}"></iframe>
				</body>
			</html>
		`}>
	</iframe>

	<div>Hello</div>
</div>