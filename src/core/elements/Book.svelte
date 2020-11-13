<script>
    import Reference from '../AbntRef.svelte'
    import { processAuthors } from '../../utils'

    export let authors = null;
    export let title = null;
    export let subtitle = null;
    export let edition = null;
    export let location = null;
    export let editor = null;
    export let date = null;

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
        location: {
            name: "Local",
            colors:  '#4299E1|whitesmoke',
            required: true,
        },
        edition: {
            name: "Edição",
            colors:  '#667EEA|whitesmoke',
        },
        editor: {
            name: "Editora",
            colors:  '#D53F8C|whitesmoke',
            required: true,
        },
        date: {
            name: "Data",
            colors:  '#38A169|whitesmoke',
            required: true,
        }
    }

    let values;
    $: values = { authors, title, subtitle, edition, location, editor, date }

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
        {#if params.authors}
            <span class="el authors" title="Autor">{Authors}</span>{#if oneName}.{/if}

            <span class="el title" title="Título">
                <b>{params.title}{#if params.subtitle}:{:else}.{/if}</b> 
            </span>

            {#if params.subtitle}
                <span class="el subtitle" title="Subtítulo">
                    <b> {params.subtitle}.</b>
                </span>
            {/if}

            {#if params.edition}
                <span class="el edition" title="Edição">{params.edition}. </span>
            {/if}
            <span class="el location" title="Local de publicação">{params.location}: </span>
            <span class="el editor" title="Editora">
                <i>{params.editor}</i>, 
            </span>
            <span class="el date" title="Data de publicação">{params.date}.</span>
        {:else}
            <span class="el title" title="Título">
                <b>{params.title}</b> 
            </span> – 
            <span class="el location" title="Local de publicação">{location}</span> – 
            <span class="el editor" title="Editora">
                <i>{params.editor}</i>
            </span> – 
            <span class="el date" title="Data de publicação">{params.date}.</span>
        {/if}
    </div>
</Reference>

<style>
    .el {
        padding: .1rem;
    }

    .ref-content {
        padding: 1rem;
        line-height: .75cm;
    }

    .descMode .el {
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
    .descMode .edition, .edition:hover {
        background: var(--edition-bg);
        color: var(--edition-txt);
    }
    .descMode .location, .location:hover {
        background: var(--location-bg);
        color: var(--location-txt);
    }
    .descMode .editor, .editor:hover {
        background: var(--editor-bg);
        color: var(--editor-txt);
    }
    .descMode .date, .date:hover {
        background: var(--date-bg);
        color: var(--date-txt);
    }
</style>