<script lang="ts">
	import { searchFonts, getFontLink } from "$lib/scripts/googleFontsHelpers";


  export let name: string;
  export let label: string;
  export let setFont: (fontName: string, fontUrl: string) => void
  let searchStr = "";
  let selected = "";
  let inputFocused = false;
  let dropdownHover = false;

  function updateResults(str: string) {
    console.log("updating results")
    const newResults = searchFonts(str, 10000)
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
  $: results = updateResults(searchStr ?? "")

  // function showResultsDropdown() {
  //   console.log("results")

  // }

  // function hideResultsDropdown() {
  //   console.log("no results")
  // }

  function selectFont(this: HTMLButtonElement, e: MouseEvent) {
    console.log(e);
    if(e.target === null) return;
    const target = this
    const cssUrl = target.dataset.fontUrl
    if(cssUrl == null) return;
    const fontName = target.innerText
    searchStr = fontName
    setFont(fontName, cssUrl)
    selected = fontName
    inputFocused = false
    dropdownHover = false
  }
</script>

<link rel="stylesheet" href={results.url} type="text/css">
<div class={'text-search-input margin-1 dropdown' + (inputFocused || dropdownHover ? ' is-active' : '')}>
  <div>
    <label class="label has-text-light" for={name}>{label}</label>
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