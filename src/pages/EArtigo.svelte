<script>
	import EArticle from '../core/elements/EArticle.svelte'

	let params;

	function checkParams() {
		if (!localStorage.getItem('earticle-params')) {
			params = {};
		} else {
			params = JSON.parse(localStorage.getItem('earticle-params'));
		}
	}

	$: checkParams();

	$: localStorage.setItem('earticle-params', JSON.stringify(params))

</script>

<main class="page">
	<h1>Referenciar artigo online</h1>

	<div class="params">
		<div style="--n: authors">
            <label for="authors">Autor(es)</label>
            <small>Nome dos autores separados por vírgula.</small>
			<input type="text" name="authors" placeholder="Autor(es)" bind:value={params.authors}>
		</div>
	
		<div style="--n: title">
			<label for="title">Título</label>
			<input type="text" name="title" placeholder="Título" bind:value={params.title}>
		</div>
	
		<div style="--n: subtitle">
			<label for="subtitle">Subtítulo</label>
			<input type="text" name="subtitle" placeholder="Subtítulo" bind:value={params.subtitle}>
		</div>
	
		<div style="--n: year">
			<label for="year">Ano</label>
			<input type="text" name="year" placeholder="Ano" bind:value={params.year}>
		</div>
	
		<div style="--n: link">
			<label for="link">Link</label>
			<input type="link" name="link" placeholder="Disponível em" bind:value={params.link}>
		</div>
	
		<div style="--n: name">
			<label for="name">Nome do site</label>
			<input type="text" name="name" placeholder="Nome do site" bind:value={params.name}>
		</div>
	
		<div style="--n: date">
			<label for="date">Acesso em</label>
			<input type="text" name="date" placeholder="Acesso em" bind:value={params.date}>
		</div>
	</div>

	<div class="referencia">
		<EArticle
			authors = {params.authors}
			title = {params.title} 
			subtitle = {params.subtitle}
			year = {params.year}
			link = {params.link}
			name = {params.name}
			date = {params.date}
		/>
	</div>
</main>

<style>
	.params {
		grid-template-areas: "authors year" "subtitle date" "name name" "title title" "link link";
    }

    .params > div:nth-child(4) {
        margin-top: auto;
    }
</style>