<script>
	import MArticle from '../core/elements/MArticle.svelte'

	let params;

	function checkParams() {
		if (!localStorage.getItem('marticle-params')) {
			params = {};
		} else {
			params = JSON.parse(localStorage.getItem('marticle-params'));
		}
	}

	$: checkParams();

	$: localStorage.setItem('marticle-params', JSON.stringify(params))

</script>

<main class="page">
	<h1>Referenciar Artigo de revista</h1>

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
	
		<div style="--n: magazine">
			<label for="magazine">Nome da revista</label>
			<input type="text" name="magazine" placeholder="Revista" bind:value={params.magazine}>
		</div>
	
		<div style="--n: details">
			<label for="details">Detalhes</label>
			<input type="text" name="details" placeholder="Volume, Nº de Fascículo, Páginas inicial-final" bind:value={params.details}>
		</div>

		<div style="--n: date">
			<label for="date">Data</label>
			<input type="text" name="date" placeholder="Mês, ano de publicação" bind:value={params.date}>
		</div>
	
		<div style="--n: location">
			<label for="location">Local</label>
			<input type="text" name="location" placeholder="Local de publicação" bind:value={params.location}>
        </div>
        
        <div style="--n: link">
			<label for="link">Link</label>
			<input type="link" name="link" placeholder="Disponível em" bind:value={params.link}>
		</div>
	
		<div style="--n: access">
			<label for="access">Acesso em</label>
			<input type="text" name="access" placeholder="Acesso em" bind:value={params.access}>
		</div>
	</div>

	<div class="referencia">
		<MArticle
            authors = {params.authors}
            title = {params.title}
            magazine = {params.magazine}
            location = {params.location}
            details = {params.details}
            date = {params.date}
            link = {params.link}
            access = {params.access}
		/>
	</div>
</main>

<style>

	.params {
		grid-template-areas: "authors magazine" "location access" "details date" "title title" "link link";
	}

    .params > div:nth-child(3) {
        margin-top: auto;
    }

</style>