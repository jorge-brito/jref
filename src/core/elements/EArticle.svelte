<script>
    import Reference from '../AbntRef.svelte'
    import { processAuthors } from '../../utils'

    export let authors = null;
    export let title = null;
    export let subtitle = null;
    export let name = null;
    export let link = null;
    export let date = null;
    export let year = null;

    export let params = {
        authors: {
            name: "Autor",
            colors:  '#718096|whitesmoke',
            process: processAuthors
        },
        title: {
            name: "Título",
            colors:  '#ECC94B|#2D3748',
            required: true,
            process: (title) => processTitle(title, authors)
        },
        subtitle: {
            name: "Subtítulo",
            colors:  '#38B2AC|whitesmoke',
        },
        name: {
            name: "Nome do site",
            colors:  '#4299E1|whitesmoke',
            required: true,
        },
        link: {
            name: "Link",
            colors:  '#667EEA|whitesmoke',
            required: true,
        },
        year: {
            name: "Ano",
            colors:  '#D53F8C|whitesmoke',
            required: true,
        },
        date: {
            name: "Acesso em",
            colors:  '#38A169|whitesmoke',
            required: true,
        }
    }

    let values;
    $: values = { authors, title, subtitle, name, link, date, year }

    function processTitle(title, authors) {
        if (!title)
            return

        if (!authors)
            return title.toUpperCase();
        else 
            return title;
    }

    let Authors, oneName;
    $: Authors = processAuthors(authors);
    $: oneName = Authors && !Authors.endsWith('.');
</script>

<Reference {params} {values} type="book" let:params let:descMode>
    <div id="result" class="ref-content" class:descMode>
        {#if authors}
            <span class="el authors" title="Autor">{params.authors}</span>{#if oneName}.{/if}
            <span class="el title" title="Título">
                <strong>{params.title}{#if params.subtitle}:{:else}.{/if}</strong> 
            </span>

            {#if params.subtitle}
                <span class="el subtitle" title="Subtítulo">
                    <strong> {params.subtitle}.</strong>
                </span>
            {/if}

            <span class="name">{params.name}, </span>
            <span class="year">{params.year}. </span>
            <span class="link">Disponível em: &lt;<a href={params.link}>{params.link}</a>&gt;. </span>
            <span class="date">Acesso em: {params.date}.</span>
        {:else}
            <span class="name">{params.name}. </span>
            <span class="el title" title="Título">
                <strong>{params.title}{#if params.subtitle}:{:else}.{/if}</strong> 
            </span>
            {#if params.subtitle}
                <span class="el subtitle" title="Subtítulo">
                    <strong> {params.subtitle}.</strong>
                </span>
            {/if}
            <span class="year">{params.year}. </span>
            <span class="link">Disponível em: &lt;<a href={params.link}>{params.link}</a>&gt;. </span>
            <span class="date">Acesso em: {params.date}.</span>
        {/if}
    </div>
</Reference>

<style>
    span {
        padding: .1rem;
    }

    .ref-content {
        padding: 1rem;
        line-height: .75cm;
    }

    .descMode span {
        cursor: pointer;
    }

    .descMode .authors, .authors:hover {
        background: var(--authors-bg);
        color: var(--authors-txt);
    }

    .descMode .title, .title:hover {
        background: var(--title-bg);
        color: var(--title-txt);
    }
    .descMode .subtitle, .subtitle:hover {
        background: var(--subtitle-bg);
        color: var(--subtitle-txt);
    }
    .descMode .name, .name:hover {
        background: var(--name-bg);
        color: var(--name-txt);
    }
    .descMode .link, .link:hover {
        background: var(--link-bg);
        color: var(--link-txt);
    }

    .descMode .date, .date:hover {
        background: var(--date-bg);
        color: var(--date-txt);
    }

    .descMode .year, .year:hover {
        background: var(--year-bg);
        color: var(--year-txt);
    }
</style>