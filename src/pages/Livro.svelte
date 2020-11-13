<script>
	import Book from '../core/elements/Book.svelte'

	let params;

	function checkParams() {
		if (!localStorage.getItem('book-params')) {
			params = {};
		} else {
			params = JSON.parse(localStorage.getItem('book-params'));
		}
	}

	$: checkParams();

	$: localStorage.setItem('book-params', JSON.stringify(params))

</script>

<main>
	<h1>Referênciar livro</h1>

	<div class="params">
		<div style="--n: authors">
			<label for="authors">Autor(es)</label>
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
	
		<div style="--n: edition">
			<label for="edition">Edição</label>
			<input type="text" name="edition" placeholder="Edição" bind:value={params.edition}>
		</div>
	
		<div style="--n: location">
			<label for="location">Local</label>
			<input type="text" name="location" placeholder="Local de publicação" bind:value={params.location}>
		</div>
	
		<div style="--n: editor">
			<label for="editor">Editora</label>
			<input type="text" name="editor" placeholder="Editora" bind:value={params.editor}>
		</div>
	
		<div style="--n: date">
			<label for="date">Data</label>
			<input type="text" name="date" placeholder="Data de publicação" bind:value={params.date}>
		</div>
	</div>

	<div class="referencia">
		<Book
			authors = {params.authors}
			title = {params.title} 
			subtitle = {params.subtitle}
			edition = {params.edition}
			location = {params.location}
			editor = {params.editor}
			date = {params.date}
		/>
	</div>
</main>

<style>
	main {
		width: 100%;
		padding: 1em;
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

	.params {
		display: grid;
		grid-template-rows: repeat(3, 1fr);
		grid-template-columns: repeat(2, 1fr);
		grid-template-areas: "authors date" "subtitle location" "edition editor" "title title";
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