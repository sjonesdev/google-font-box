<script lang="ts">
  export let forName: string = "";
  export let innerText: string = "";
</script>

<label class="label has-text-light" for={forName}>
  {innerText}
</label>