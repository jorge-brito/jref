<script>
    import Reference from '../AbntRef.svelte'
    import { processAuthors } from '../../utils'

    export let authors = null;
    export let title = null;
    export let magazine = null;
    export let location = null;
    export let details = null;
    export let date = null;
    export let link = null;
    export let access = null;

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
        magazine: {
            name: "Revista",
            colors:  '#38B2AC|whitesmoke',
        },
        location: {
            name: "Local de publicação",
            colors:  '#4299E1|whitesmoke',
            required: true,
        },
        details: {
            name: "Detalhes",
            colors:  '#D53F8C|whitesmoke',
            required: true,
        }, 
        date: {
            name: "Data publicação",
            colors:  '#38A169|whitesmoke',
            required: true,
        },
        link: {
            name: "Link",
            colors:  '#667EEA|whitesmoke',
        },
        access: {
            name: "Acesso em",
            colors:  '#805AD5|whitesmoke',
        },
    }

    let values;
    $: values = {authors, title, magazine, location, details, date, link, access}

    function processTitle(title, authors) {
        if (!title)
            return

        if (!authors)
            return title.toUpperCase().trim();
        else 
            return title.trim();
    }

    let Authors, oneName;
    $: Authors = processAuthors(authors);
    $: oneName = Authors && !Authors.endsWith('.');

</script>

<Reference {params} {values} type="book" let:params let:descMode>
    <div id="result" class="ref-content" class:descMode>
        <span class="el authors" title="Autor">{params.authors}</span>{#if oneName}.{/if}
        <span class="el title" title="Título">
            <strong>{params.title}{#if params.subtitle}:{:else}.{/if}</strong> 
        </span>

        <span class="magazine">{params.magazine}, </span>
        <span class="location">{params.location}, </span>
        <span class="details">{params.details}, </span>
        <span class="date">{params.date}. </span>
        {#if params.link}
            <span class="link">Disponível em: &lt;<a href={params.link}>{params.link}</a>&gt;. </span>
            <span class="access">Acesso em: {params.access}.</span>
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
    .descMode .magazine, .magazine:hover {
        background: var(--magazine-bg);
        color: var(--magazine-txt);
    }
    .descMode .location, .location:hover {
        background: var(--location-bg);
        color: var(--location-txt);
    }
    .descMode .details, .details:hover {
        background: var(--details-bg);
        color: var(--details-txt);
    }
    .descMode .date, .date:hover {
        background: var(--date-bg);
        color: var(--date-txt);
    }
    .descMode .link, .link:hover {
        background: var(--link-bg);
        color: var(--link-txt);
    }
    .descMode .access, .access:hover {
        background: var(--access-bg);
        color: var(--access-txt);
    }
</style>