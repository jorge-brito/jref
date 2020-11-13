<script>
	import EArtigo from './pages/EArtigo.svelte';
	import MArtigo from './pages/MArtigo.svelte';
	import Livro from './pages/Livro.svelte';
	import Router, {link, location} from 'svelte-spa-router';

	const routes = {
		'/': Livro,
		'/artigo-online': EArtigo,
		'/artigo-de-revista': MArtigo,
	}
</script>

<main>
	<nav>
		<a href="/" use:link class:active={$location == '/'}>
			Livro
		</a>
		<a href="/artigo-online" use:link class:active={$location == '/artigo-online'}>
			Artigo online
		</a>
		<a href="/artigo-de-revista" use:link class:active={$location == '/artigo-de-revista'}>
			Artigo de revista
		</a>
	</nav>
	<div class="routes">
		<Router {routes} />
	</div>
</main>
<footer>
	Feito por <em><strong>Jorge Pereira</strong></em>. <br>
	<a href="https://github.com/jorge-brito/jref">
		<i class="mdi mdi-github"></i>
	</a>
</footer>

<style>
	main {
		display: grid;
		grid-template-columns: max-content auto;
		grid-template-rows: 100%;
		width: 95%;
		height: 95%;
		min-width: 300px;
		max-width: 800px;
		margin: auto auto;
		box-shadow: 0 3px 16px rgba(32,32,32,.2);
		overflow: hidden;
		margin-top: 1rem;
	}

	footer {
		padding: 1rem;
		margin-top: 1.3rem;
		text-align: center;
		line-height: .85cm;
		border-top: 1px solid rgba(32,32,32,.2);
	}

	footer a {
		color: #333;
		font-size: 1.5em;
	}

	nav {
		display: flex;
		flex-direction: column;	
		background: #6ED8FF;
		border-right: 8px solid #5FC5EB;
	}

	nav a {
		color: whitesmoke;
		text-decoration: none;
		padding: 1.25rem .75rem;
		max-width: 80px;
		text-align: center;
		font-weight: bold;
	}

	nav a::-moz-focus-inner, nav a:focus {
		border: 0;
		outline: none;
	}

	nav a:hover, nav a.active {
		background: #5FC5EB;
	}

	.routes {
		height: 100%;
		overflow: auto;
	}
</style>