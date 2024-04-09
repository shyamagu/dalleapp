<script>
    import { scale,fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    import DallePanel from "./DallePanel.svelte";
    import Config from "./Config.svelte";

    let config = {endpoint:"", apiKey:""}
    let isConfigSetting = false;

    /**
     * @param {{detail: string;}} event
     */
     function handleConfig(event) {
    config = JSON.parse(event.detail);
    isConfigSetting = true;
    }

</script>

{#if !isConfigSetting}
    <div transition:scale={{ delay: 100, duration: 100, easing: quintOut }}>
        <Config 
        on:result={handleConfig}
        bind:endpoint={config.endpoint}
        bind:apiKey={config.apiKey}
        />
    </div>
{:else}
    <div class="main">
        <DallePanel apiKey={config.apiKey} endpoint={config.endpoint}/>
    </div>
{/if}

<style>
    .main{
        width:1000px;
        margin:auto;
    }

</style>