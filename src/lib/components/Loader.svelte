<script lang='ts'>
  export let loaded = false;
</script>

{#if loaded}
  <slot></slot>
{:else}
  <div class="loader"></div>
{/if}