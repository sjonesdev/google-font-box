<script lang="ts">
  export let ariaLabel: string = "";
</script>
<fieldset class="is-flex is-align-items-flex-end fieldset margin-1-h horiz-fieldset" aria-label={ariaLabel}>
  <slot></slot>
</fieldset>