<script lang="ts">
	import { searchFonts, getFontLink, getFontVariants, hasFont, FontVariantNames, FontVariants, type FontDisplaySpec } from "$lib/scripts/googleFontsHelpers";
  import Label from "$lib/components/Label.svelte"


  export let name: string;
  export let label: string;
  export let initialSelected: string = "";
  export let setFont: (fontInfo: FontDisplaySpec) => void
  let searchStr = initialSelected ?? "";
  let selected = hasFont(searchStr) ? searchStr : ""
  let inputFocused = false;
  let dropdownHover = false;
  
  function updateResults(str: string) {
    console.log("updating results")
    const newResults = searchFonts(str, 200)
    console.log('new results:', newResults)
    // if(url == null) { // haven't fetched fonts yet, wait a little and try again
    //   console.log("haven't gotten fonts yet, will try again soon")
    //   setTimeout(() => {
    //     console.log("reassigning searchStr to trigger update");
    //     searchStr = searchStr; // reassign search string after wait to trigger update of results again
    //   }, 500)
    // }
    return newResults;
  }
  $: results = updateResults(searchStr ?? "");
  
  function updateSelectedVariants(str: string) {
    console.log("updating variants")
    const newVariants = getFontVariants(str)
    console.log("new varaints", newVariants)
    return newVariants
  }
  $: selectedVariants = updateSelectedVariants(selected ?? "");
    
  const DEFAULT_VARIANT = FontVariants.Regular
  let selectedVariant: string = DEFAULT_VARIANT//selectedVariants.includes('regular') ? 'regular' : (selectedVariants[0] ?? "");
  function resetSelectedVariant() {
    selectedVariant = DEFAULT_VARIANT
  }

  function selectFont(this: HTMLButtonElement, e: MouseEvent) {
    console.log(e);
    if(e.target === null) return;
    const target = this
    const cssUrl = target.dataset.fontUrl
    if(cssUrl == null) return;
    const fontName = target.innerText
    searchStr = fontName
    resetSelectedVariant()
    setFont({
      name: fontName, 
      variant: selectedVariant, 
      url: cssUrl
    })
    selected = fontName
    inputFocused = false
    dropdownHover = false
  }

  function selectVariant(this: HTMLSelectElement, e: Event) {
    selectedVariant = this.value
    const displayFontLink = getFontLink(selected, selectedVariant);
    console.log("selected variant ", this.value, " at ", displayFontLink)
    setFont({
      name: selected, 
      variant: selectedVariant,
      url: displayFontLink ?? ""
    });
  }
</script>

<link rel="stylesheet" href={results.url} type="text/css">
<div class={'text-search-input dropdown' + (inputFocused || dropdownHover ? ' is-active' : '')}>
  <div>
    <Label forName={name} innerText={label} />
    <input 
      class="input dropdown-trigger"
      aria-haspopup="true"
      aria-controls="dropdown search"
      type="text" 
      name={name}
      id={name}
      on:focus={() => {inputFocused = true;}}
      on:blur={() => {inputFocused = false}}
      bind:value={searchStr}
    >
  </div>
  <div 
    class="dropdown-menu" 
    role="menu"
    on:blur={() => {console.log("blur"); dropdownHover = false}}
    on:mouseout={() => {console.log("mouseout"); dropdownHover = false}}
    on:focus={() => {console.log("focus"); dropdownHover = true}}
    on:mouseover={() => {console.log("mouseover"); dropdownHover = true}}
  >
    <div class="dropdown-content">
      {#each results.fontNames as fontName}
        <button 
          class={'dropdown-item button ' + (selected === fontName ? "is-active" : "is-white")}
          type='button'
          data-font-url={getFontLink(fontName)}
          on:click={selectFont}
          style="font-family: {fontName};"
        >
          {fontName}
        </button>
      {/each}
    </div>
  </div>
</div>
<div class="select">
  <select name="{name}-variants" id="{name}-variants" on:change={selectVariant} bind:value={selectedVariant}>
    {#each selectedVariants as variant}
      <option 
        value={variant} 
        selected={variant === DEFAULT_VARIANT}
      >
        {FontVariantNames[variant]}
      </option>
    {/each}
  </select>
</div>