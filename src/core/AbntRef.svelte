<script>
    import { slide } from 'svelte/transition'
    import { palette, selectText } from '../utils'

    export let type;
    export let values;
    /**
     * ```typescript
     *  params: {
     *      [key]: {
     *          name: string;
     *          processs?: (value) => string;
     *          colors: string;
     *          required?: boolean;
     *      }
     *  }
     * ```
     */
    export let params;

    export let layout;


    function getTheme(params) {
        return Object.entries(params)
            .reduce((p, [key, value]) => {
                return { ...p, [key]: value.colors }
        }, {})
    }

    function process(values) {
        return Object.keys(values).reduce((p, key) => {
            if (params[key].process)
                return {...p, [key]: params[key].process(values[key])}
            else 
                return {...p, [key]: values[key]}
        }, {})
    }

    function getNecessary(params) {
        return Object.entries(params)
            .filter(([_, value]) => !!value.required)
            .map(([key, value]) => ({ name: value.name, value: values[key] }))
    }

    let theme;
    $: theme = getTheme(params);

    let Values;
    $: Values = process(values);

    let necessaryParams;
    $: necessaryParams = getNecessary(params);


    let validReference;
    $: validReference = Object.entries(params)
        .filter(([_, value]) => value.required)
        .every(([key]) => !!values[key])

    let descMode = false;

    let paramsInUse;
    $: paramsInUse = Object.entries(Values).filter(([key, value]) => !!value).map(([key]) => key);

    let legenda;
    $: legenda = Object.entries(theme)
        .map(([name, value]) => ({ name, color: value.split('|')[0] }))
        .filter(({ name }) => paramsInUse.includes(name))
        .map(leg => ({ name: params[leg.name].name, color: leg.color }));
</script>

<section class="reference" type={type} style="--layout: {layout}; {palette(theme, "bg|txt")}">
    {#if !validReference}
        <div class="error">
            <h2>Referência inválida.</h2>
            <p>Os seguintes parâmetros são obrigatórios: </p>
            <ul>
                {#each necessaryParams as nparams}
                    <li>{nparams.name}</li>
                {/each}
            </ul>
        </div>
    {:else}
        <div class="container">
            <div class="header">
                <div class="btn" on:click={(e) => descMode = !descMode} title={descMode ? "Ocultar detalhes" : "Ver detalhes"}>
                    <i class="mdi mdi-eye{descMode ? '-off' : ''}"></i>
                </div>
                <div class="btn copy" on:click={(e) => selectText('result')} title="Copiar texto">
                    <i class="mdi mdi-content-copy"></i>
                </div>
            </div>
            <slot params={Values} descMode={descMode}></slot>
            {#if descMode}
                <div class="legenda" transition:slide>
                    {#each legenda as leg}
                        <div style="--color: {leg.color}">{leg.name}</div>
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
</section>

<style>
    .reference {
        width: 100%;
        margin-top: 2rem;
        text-align: justify;
    }

    .error, .container {
        margin: 0 auto;
    }

    .container {
        max-width: 520px;
        border: 1px solid rgba(32, 32, 32, 0.2);
        border-radius: 5px;
    }


    .container:hover {
        box-shadow: 0 0 6px rgba(32, 32, 32, 0.2);
    }

    .header {
        border-bottom: 1px solid rgba(32, 32, 32, 0.2);
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    .header .btn {
        width: max-content;
        padding: 0.5rem;
        border-radius: 5px;
        width: 35px;
        height: 35px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header .btn:hover {
        background: rgba(32, 32, 32, 0.062);
        box-shadow: 0 0 6px rgba(32, 32, 32, 0.507);
    }

    .error {
        max-width: 400px;
        color: rgb(255, 51, 51);
    }

    .error ul li:not(:first-of-type) {
        margin-top: 1rem;
    }

    .legenda {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding: 1rem;
    }

    .legenda div {
        padding: .25rem;
        display: grid;
        grid-template-columns: max-content 1fr;
        align-items: center;
        column-gap: .5rem;
    }

    .legenda div::before {
        content: "";
        width: .75em;
        height: .75em;
        background: var(--color);
        display: inline-block;
    }
</style>