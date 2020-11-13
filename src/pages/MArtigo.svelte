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

<main>
	<h1>Artigo de revista</h1>

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
			<label for="location">Local de publicação</label>
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
	main {
		padding: 1em;
		width: 100%;
		margin: 0 auto;
	}

	h1 {
		color: #5FC5EB;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
		text-align: center;
		margin: 1rem auto 2rem auto;
    }
    
    small {
        margin-top: 0.25rem;
    }

	.params {
		display: grid;
		grid-template-rows: repeat(3, max-content);
		grid-template-columns: repeat(2, 1fr);
		grid-template-areas: "authors magazine" "location access" "details date" "title title" "link link";
		row-gap: 1rem;
		column-gap: 1rem;
        max-width: 520px;
		margin: 0 auto;
    }
    
	.params > div {
		display: flex;
		flex-direction: column;
        align-items: flex-start;
		grid-area: var(--n)
    }
    
    .params > div:nth-child(3) {
        margin-top: auto;
    }

	.params > div input {
		width: 100%;
		padding: 0.5rem;
		margin-top: 0.5rem;
		border-radius: 3px;
		outline: none;
		border: 1px solid rgba(33, 33, 33, .2);
	}

	.params > div input:focus {
		box-shadow: 0 0 6px 1px rgba(41, 159, 255, 0.26);
	}
</style>